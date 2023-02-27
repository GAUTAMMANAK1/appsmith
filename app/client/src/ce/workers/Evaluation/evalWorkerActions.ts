export enum EVAL_WORKER_SYNC_ACTION {
  SETUP = "SETUP",
  EVAL_TREE = "EVAL_TREE",
  EVAL_ACTION_BINDINGS = "EVAL_ACTION_BINDINGS",
  CLEAR_CACHE = "CLEAR_CACHE",
  VALIDATE_PROPERTY = "VALIDATE_PROPERTY",
  UNDO = "undo",
  REDO = "redo",
  UPDATE_REPLAY_OBJECT = "UPDATE_REPLAY_OBJECT",
  SET_EVALUATION_VERSION = "SET_EVALUATION_VERSION",
  INIT_FORM_EVAL = "INIT_FORM_EVAL",
  EXECUTE_SYNC_JS = "EXECUTE_SYNC_JS",
  INSTALL_LIBRARY = "INSTALL_LIBRARY",
  UNINSTALL_LIBRARY = "UNINSTALL_LIBRARY",
  LOAD_LIBRARIES = "LOAD_LIBRARIES",
  LINT_TREE = "LINT_TREE",
}

export enum EVAL_WORKER_ASYNC_ACTION {
  EVAL_TRIGGER = "EVAL_TRIGGER",
  EVAL_EXPRESSION = "EVAL_EXPRESSION",
}

export const EVAL_WORKER_ACTIONS = {
  ...EVAL_WORKER_SYNC_ACTION,
  ...EVAL_WORKER_ASYNC_ACTION,
};

export enum MAIN_THREAD_ACTION {
  PROCESS_TRIGGER = "PROCESS_TRIGGER",
  PROCESS_BATCHED_TRIGGERS = "PROCESS_BATCHED_TRIGGERS",
  PROCESS_STORE_UPDATES = "PROCESS_STORE_UPDATES",
  PROCESS_LOGS = "PROCESS_LOGS",
  LINT_TREE = "LINT_TREE",
  PROCESS_JS_FUNCTION_EXECUTION = "PROCESS_JS_FUNCTION_EXECUTION",
  UPDATE_DATATREE = "UPDATE_DATATREE",
}
