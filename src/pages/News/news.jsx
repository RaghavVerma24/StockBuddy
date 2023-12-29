import React, { useEffect, useState, useRef } from 'react';
import { DefaultApi } from 'finnhub-ts';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const articleContainerRef = useRef(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const finnhubClient = new DefaultApi({
      apiKey,
      isJsonMime: (input) => {
        try {
          JSON.parse(input);
          return true;
        } catch (error) {}
        return false;
      },
    });

    const fetchNews = async () => {
      try {
        const response = await finnhubClient.marketNews('general', {});
        const newsWithFormattedDate = response.data.map(article => {
          const unixTimestamp = article.datetime;
          const date = new Date(unixTimestamp * 1000);
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
          return {
            ...article,
            formattedDate // Add the formatted date to the article object
          };
        });
        setNewsData(newsWithFormattedDate);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) =>
        prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentArticleIndex, newsData]);

  useEffect(() => {
    if (articleContainerRef.current) {
      const articleHeight = articleContainerRef.current.clientHeight;
      articleContainerRef.current.scrollTo({
        top: articleHeight * currentArticleIndex,
        behavior: 'smooth',
      });
    }
  }, [currentArticleIndex]);

  return (
    <div className='ml-6 h-full rounded-lg min-w-[21%] max-w-[21%] overflow-hidden mt-6 bg-white' style={{ overflowY: 'auto' }}>
      <div
        id='news-article'
        ref={articleContainerRef}
        style={{
          maxHeight: '100%',
          height: 'fit-content',
          paddingRight: '17px', /* Adjust for scrollbar width */
          boxSizing: 'content-box' /* Include padding in width */
        }}
      >
        {newsData.map((article, index) => (
          <div
            key={article.id}
            className={`mb-10 max-w-[30rem] ${
              index === currentArticleIndex ? 'block' : 'hidden'
            }`}
            style={{ position: 'relative' }}
          >
            <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
              <img src={article.image} alt='News' className='rounded-t-lg h-[15rem]' />
            </a>
            <div className='p-5 h-[10rem] max-w-[30rem]'>
              <h3 className="font-dm-sans font-normal text-base flex items-center text-gray-700">
                {article.headline}
              </h3>
              <p className="font-dm-sans font-normal text-md leading-[11px] flex items-center text-gray-400 my-2">
                {article.formattedDate}
              </p>
              <p className="absolute w-336 h-30 left-1103 top-808 font-dm-sans font-normal text-base leading-[15px] flex items-center text-gray-400 mb-4">
                {article.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
