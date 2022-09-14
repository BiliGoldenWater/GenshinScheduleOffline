import React, {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Config,
  ConfigContext,
  ConfigKeys,
  DefaultConfig,
  SyncContext,
} from "../utils/config";
import { MultiMap } from "../utils/multiMap";
import { PromiseSignal } from "../utils/promiseSignal";
import { IntlProvider } from "react-intl";
import { Language, Localizations } from "../langs";

const ConfigProvider = ({
  initial,
  language,
  children,
}: {
  initial?: Config | null;
  language?: Language | null;
  children?: ReactNode;
}) => {
  if (initial) {
    return (
      <SynchronizedConfigProvider
        config={initial}
        language={language || undefined}
      >
        {children}
      </SynchronizedConfigProvider>
    );
  } else {
    return (
      <LocalConfigProvider language={language || undefined}>
        {children}
      </LocalConfigProvider>
    );
  }
};

function getLocalConfig(): Config {
  const result = { ...DefaultConfig };

  for (const key of ConfigKeys) {
    try {
      (result as any)[key] = JSON.parse(localStorage.getItem(key) || "");
    } catch {
      // ignored
    }
  }

  return result;
}

function setLocalConfig(config: Config) {
  for (const key of ConfigKeys) {
    const value = (config as any)[key];
    const defaultValue = (DefaultConfig as any)[key];

    if (value === defaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

const LocalConfigProvider = ({
  language,
  children,
}: {
  language?: Language;
  children?: ReactNode;
}) => {
  const [value, setValueCore] = useState(DefaultConfig);
  const setValue = useCallback((newValue: SetStateAction<Config>) => {
    if (typeof newValue === "function") {
      newValue = newValue(getLocalConfig());
    }

    setValueCore(newValue);

    // propagate local changes to other tabs by writing to storage
    setLocalConfig(newValue);
  }, []);

  useEffect(() => {
    const updateState = () => setValueCore(getLocalConfig());

    // next.js requires server rendered markup to match the client side,
    // but since local config is stored in localStorage, it is not accessible from the server.
    // we use default config for the initial render, then set the correct config only on the client at the second frame
    updateState();

    // propagate changes from other tabs to local state without writing to storage
    window.addEventListener("storage", updateState);
    return () => window.removeEventListener("storage", updateState);
  }, []);

  return (
    <ConfigContextRoot value={value} setValue={setValue} language={language}>
      {children}
    </ConfigContextRoot>
  );
};

const SynchronizedConfigProvider = ({
  config,
  language,
  children,
}: {
  config: Config;
  language?: Language;
  children?: ReactNode;
}) => {
  const [value, setValue] = useState(() => ({ ...DefaultConfig, ...config }));
  const [, setSync] = useState(false);

  const lastValue = useRef(config);
  const configQueue: Config[] = useMemo(() => [], []);
  const patchTimeout = useRef<number>();

  const pushPatches = useCallback(() => {
    lastValue.current = value;
    configQueue.push(value);
  }, [value]);

  useEffect(() => {
    clearTimeout(patchTimeout.current);
    patchTimeout.current = window.setTimeout(pushPatches, 200);
  }, [pushPatches]);

  const signals: PromiseSignal<void>[] = useMemo(() => [], []);
  const callbacks: Set<() => Promise<void>> = useMemo(() => new Set(), []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      while (mounted) {
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!configQueue.length) {
          continue;
        }

        setSync(true);

        const callbackPromise = Promise.all(
          Array.from(callbacks).map((c) => c())
        );
        callbacks.clear();

        // save
        const configs = [...configQueue];
        configQueue.length = 0;

        // todo: apply configs

        await callbackPromise;

        signals.forEach((signal) => signal.resolve());

        setSync(false);
        signals.length = 0;
      }
    })();

    return () => {
      mounted = false;
    };
  }, [signals, configQueue]);

  return (
    <ConfigContextRoot value={value} setValue={setValue} language={language}>
      <SyncContext.Provider
        value={useMemo(
          () => ({
            enabled: true,
            synchronize: () => {
              pushPatches();

              const signal = new PromiseSignal<void>();
              signals.push(signal);
              return signal.promise;
            },
            callbacks,
          }),
          [pushPatches, signals, callbacks]
        )}
      >
        {children}
      </SyncContext.Provider>
    </ConfigContextRoot>
  );
};

const ConfigContextRoot = ({
  value,
  setValue,
  language = "en-US",
  children,
}: {
  value: Config;
  setValue: Dispatch<SetStateAction<Config>>;
  language?: Language;
  children?: ReactNode;
}) => {
  const ref = useRef(value);
  const set = useCallback(
    (newValue: SetStateAction<Config>) => {
      setValue((value) => {
        if (typeof newValue === "function") {
          newValue = newValue(value);
        }

        return { ...DefaultConfig, ...newValue };
      });
    },
    [setValue]
  );

  const events = useMemo(() => new MultiMap<string, () => void>(), []);

  useEffect(() => {
    const changes = ConfigKeys.filter((key) => {
      const previous = (ref.current as any)[key];
      const current = (value as any)[key];

      return previous !== current;
    });

    ref.current = value;

    for (const key of changes) {
      for (const callback of events.get(key)) {
        callback();
      }
    }
  }, [value, events]);

  if (value.language !== "default") {
    language = value.language;
  }

  return (
    <ConfigContext.Provider
      value={useMemo(
        () => ({
          ref,
          set,
          events,
        }),
        [ref, set, events]
      )}
    >
      <IntlProvider locale={language} messages={Localizations[language]}>
        {children}
      </IntlProvider>
    </ConfigContext.Provider>
  );
};

export default memo(ConfigProvider);
