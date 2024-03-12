import { IS_BROWSER } from '$fresh/runtime.ts';
import { JSX } from 'preact';
import { useCallback } from 'preact/hooks';

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const ignoreProps = ['href', 'children'];
  const nextProps = Object.fromEntries(Object.entries(props).filter(([key]) => !ignoreProps.includes(key)));

  const handleOnClickHref = useCallback(({ href }: { href: string }) => {
    return location.replace(href);
  }, []);

  return (
    <button
      disabled={!IS_BROWSER || props.disabled}
      class='default'
      {...props.href && { onClick: () => handleOnClickHref({ href: props.href as string }) }}
      {...nextProps}
    >
      {props.children}
    </button>
  );
}

export default Button;
