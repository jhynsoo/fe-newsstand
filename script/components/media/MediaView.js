import { MEDIA } from '../../constants.js';
import { getCategoryData } from '../../fetch/getNewsData.js';
import { shuffleArray } from '../../utils/utils.js';
import MediaGrid from './MediaGrid.js';
import MediaList from './MediaList.js';

const createMediaData = view => {
  if (view === 'grid') {
    const gridMediaData = Array.from(
      { length: MEDIA.TOTAL },
      (_, index) => index
    );

    return shuffleArray(gridMediaData);
  }
  return getCategoryData().then(category => {
    category.forEach(categoryData => {
      shuffleArray(categoryData.media);
    });
    return category;
  });
};

const MediaView = (themeStore, navStore) => {
  const { view, subscribed } = navStore.getState();
  const mediaView = document.createElement('div');
  const mediaData = createMediaData(view);

  mediaView.id = 'media_view';
  if (view === 'list') {
    mediaData.then(mediaData => {
      mediaView.appendChild(
        MediaList(themeStore, navStore, { mediaData, subscribed })
      );
    });
  } else {
    mediaView.appendChild(
      MediaGrid(themeStore, navStore, { mediaData, subscribed })
    );
  }
  return mediaView;
};

export default MediaView;
