import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchInitialImages } from './Pixabay/Pixabay';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  const fetchImages = useCallback(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);

    fetchInitialImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        setGallery((prevGallery) => [...prevGallery, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      })
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => {
        setIsLoading(false);
        if (page === 1) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
  }, [page, searchQuery]);

  useEffect(() => {
    if (page !== 1 || searchQuery) {
      fetchImages();
    }
  }, [page, searchQuery, fetchImages]);

  const handleFormSubmit = (query) => {
    if (!query) {
      return;
    }

    setSearchQuery(query);
    setGallery([]);
    setPage(1);
    setLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = (imageURL = '') => {
    setShowModal((prevShowModal) => !prevShowModal);
    setSelectedImage(imageURL);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={gallery} toggleModal={toggleModal} />
      {loadMore && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={selectedImage} />
      )}
    </div>
  );
}

export default App;
