interface ErrorType {
  message: string;
  stack?: string;
}

interface LogstashErrorFormat {
  Type: string;
  stack_trace: string | undefined;
  message: string;
}
interface ECSFormat {
  level: string;
  logger_name: string;
  hostname: string;
  message: string;
  error?: LogstashErrorFormat;
}

const ecsFormatString = (level: string, message: string, e?: ErrorType) => {
  const payload: ECSFormat = {
    level,
    logger_name: `abc.nextjs-dashboard-${process.env.NEXT_APP_ENVIRONMENT}`,
    hostname: "",
    message: `${message}${e?.stack ? `\n${e.stack}` : ""}`,
  };

  if (e !== undefined) {
    payload.error = {
      Type: "Error",
      stack_trace: e.stack,
      message: e.message,
    };
  }

  return JSON.stringify(payload);
};

const logger = {
  debug: async (message: string) => {
    console.debug(ecsFormatString("debug", message));
  },
  info: async (message: string) => {
    console.info(ecsFormatString("info", message));
  },
  warning: async (message: string) => {
    console.warn(ecsFormatString("warning", message));
  },
  error: async (message: string, e: any = undefined) => {
    console.warn(ecsFormatString("error", message, e));
  },
};

export default logger;
