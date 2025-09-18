import './Slideshow.css';

// Component that shows images in either list or grid view
function Slideshow({ title, images, viewMode = 'list', className }: any) {
  return (
    <div className={className ? `slideshow-container ${className}` : 'slideshow-container'}>
      <div className="header">
        <h2>{title}</h2>
      </div>
            
      <div className={viewMode === 'list' ? 'images list-mode' : 'images grid-mode'}>
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
