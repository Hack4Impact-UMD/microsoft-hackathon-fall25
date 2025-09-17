import { useState } from 'react';
import './Slideshow.css';

// Component that shows images in either list or grid view
function Slideshow({ title, images, viewMode = 'list', onViewModeChange, className }: any) {
  const [currentView, setCurrentView] = useState(viewMode);

  function changeView(newView: string) {
    setCurrentView(newView);
    if (onViewModeChange) {
      onViewModeChange(newView);
    }
  }

  return (
    <div className={className ? `slideshow-container ${className}` : 'slideshow-container'}>
      <div className="header">
        <h2>{title}</h2>
        <div className="buttons">
          <button
            className={currentView === 'list' ? 'button active' : 'button'}
            onClick={() => changeView('list')}
          >
            List
          </button>
          <button
            className={currentView === 'grid' ? 'button active' : 'button'}
            onClick={() => changeView('grid')}
          >
            Grid
          </button>
        </div>
      </div>
            
      <div className={currentView === 'list' ? 'images list-mode' : 'images grid-mode'}>
        {images.map((image: any) => (
          <div key={image.id} className="image-wrapper">
            <img src={image.src} alt={image.alt} />
            {image.caption && <p>{image.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
