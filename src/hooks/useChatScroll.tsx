import React, { MutableRefObject } from "react";

// https://dev.to/deepcodes/automatic-scrolling-for-chat-app-in-1-line-of-code-react-hook-3lm1

function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement> {
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref as unknown as MutableRefObject<HTMLDivElement>;
}

export default useChatScroll;
