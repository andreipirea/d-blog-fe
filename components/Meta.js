import Head from 'next/head';

const Meta = ({title, keywords, description}) => {
  return (
    <Head>
      <meta name='viewport'
      content='width=device-width,
      initial-scale=1' />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta name='keywords' content={keywords}/>
      <meta name='description' content={description}/>
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Casuța cu povești',
  keywords: 'web development',
  description: 'get the latest news'
};

export default Meta;