#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::path::PathBuf;
use std::time::Duration;

use tauri::{
  App, LogicalPosition, LogicalSize, Manager, Position, Runtime, Size, WindowBuilder, WindowUrl,
};

fn main() {
  let app = tauri::Builder::default()
    .setup(|app| {
      setup(app);
      Ok(())
    })
    .build(tauri::generate_context!())
    .expect("error while build tauri application");

  app.run(|app_handle, event| match event {
    tauri::RunEvent::Ready => {
      let window = app_handle.get_window("main").unwrap();
      let info = load(app_dir(app_handle));

      // apply pos and size
      tauri::async_runtime::spawn(async move {
        window
          .set_position(Position::Logical(LogicalPosition {
            x: info.x,
            y: info.y,
          }))
          .expect("Unexpected error when set window position at restore state");

        tokio::time::sleep(Duration::from_millis(150)).await;

        window
          .set_size(Size::Logical(LogicalSize {
            width: info.width,
            height: info.height,
          }))
          .expect("Unexpected error when set window size at restore state");
      });
    }
    tauri::RunEvent::WindowEvent { label, event, .. } => match event {
      tauri::WindowEvent::CloseRequested { .. } => {
        if label == "main".to_string() {
          let window = app_handle.get_window("main").unwrap();

          let monitor = window.current_monitor().unwrap();

          if let Some(monitor) = monitor {
            // save info
            let scale_factor = monitor.scale_factor();

            let size = window.inner_size().unwrap().to_logical(scale_factor);
            let pos = window.inner_position().unwrap().to_logical(scale_factor);

            let info = LastRunInfo {
              width: size.width,
              height: size.height,
              x: pos.x,
              y: pos.y,
            };

            save(app_dir(app_handle), info);
          } else {
            // reset to default
            save(app_dir(app_handle), LastRunInfo::default());
          }
        }
      }
      _ => {}
    },
    _ => {}
  })
}

fn setup(app: &mut App) {
  let window = WindowBuilder::new(app, "main", WindowUrl::App("/".into()))
    .title((*app.config()).clone().package.product_name.unwrap())
    .build()
    .expect("Unexpected error when build window");

  window.show().expect("Unexpected error when showing window");
}

#[derive(serde::Serialize, serde::Deserialize)]
struct LastRunInfo {
  width: f64,
  height: f64,
  x: f64,
  y: f64,
}

impl Default for LastRunInfo {
  fn default() -> Self {
    Self {
      width: 800.0,
      height: 600.0,
      x: 0.0,
      y: 0.0,
    }
  }
}

fn load(app_dir: PathBuf) -> LastRunInfo {
  let mut f = app_dir.clone();
  f.push("lastRun.json");

  let info_str = std::fs::read_to_string(f)
    .or::<std::io::Error>(Ok(serde_json::to_string(&LastRunInfo::default()).unwrap()))
    .expect("Unexpected error when reading last run info");
  serde_json::from_str(&*info_str).expect("Unexpected error when parse last run info")
}

fn save(app_dir: PathBuf, last_run_info: LastRunInfo) {
  let mut f = app_dir.clone();
  f.push("lastRun.json");

  std::fs::write(f, serde_json::to_string(&last_run_info).unwrap())
    .expect("Unexpected error when writing last run info")
}

fn app_dir<R: Runtime, M: Manager<R>>(app: &M) -> PathBuf {
  tauri::api::path::app_dir(&*app.config()).expect("Unexpected None of app_dir")
}
