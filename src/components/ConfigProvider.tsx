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
    throw Error("config not inited");
  }
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

        // @ts-ignore
        if (window.__TAURI_IPC__) {
          // tauri
          let { BaseDirectory, readDir, createDir, writeTextFile } =
            await import("@tauri-apps/api/fs");
          try {
            await readDir("", { dir: BaseDirectory.App });
          } catch (e) {
            await createDir("", { dir: BaseDirectory.App, recursive: true });
          }
          for (let cfg of configs) {
            await writeTextFile("config.json", JSON.stringify(cfg), {
              dir: BaseDirectory.App,
            });
          }
        } else {
          // localStorage
          for (let cfg of configs) {
            window.localStorage.setItem("config", JSON.stringify(cfg));
          }
        }

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
