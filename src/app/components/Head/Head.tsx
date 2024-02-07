interface HeadProps {
  /** Document title for page (will always append "Syelo") */
  title?: string;
}

export function Head({ title }: HeadProps) {
  let fullTitle = "Syelo";

  if (title) {
    fullTitle = `${title} – ${fullTitle}`;
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Syelo" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
