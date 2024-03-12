import { useEffect, useState } from 'preact/hooks';

const KEY = 'a29507eea26f010405870c';

type IframelyProps = {
  url: string;
};

export default function Iframely(props: IframelyProps) {
  const [error, setError] = useState<{ code: number; message: string } | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [html, setHtml] = useState({
    __html: '<div />',
  });

  useEffect(() => {
    if (props && props.url) {
      fetch(
        `https://cdn.iframe.ly/api/iframely?url=${
          encodeURIComponent(
            props.url,
          )
        }&api_key=${KEY}&omit_css=true&omit_script=1&iframe=1`,
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setIsLoaded(true);
            if (res.html) {
              setHtml({ __html: res.html });
            } else if (res.error) {
              setError({ code: res.error!, message: res.message });
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          },
        );
    } else {
      setError({ code: 400, message: 'Provide url attribute for the element' });
    }
  }, []);

  if (error) {
    return (
      <div>
        Error: {error?.code} - {error?.message}
      </div>
    );
  } else if (!isLoaded) {
    return <div>Loading…</div>;
  } else {
    return <div className='iframely' dangerouslySetInnerHTML={html} />;
  }
}
