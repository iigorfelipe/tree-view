import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/theme';
import headerMobile from '/header-mobile.png';
import headerWeb from '/header.jpg';

export const Home = () => {
  const { isSmDown } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        <img src={isSmDown ? headerMobile : headerWeb} alt="header image" className="w-full h-auto" />
        {isSmDown && (
          <button
            onClick={() => navigate('/companies')}
            className="cursor-pointer bg-transparent border-none p-0 absolute bottom-5 left-2/4 transform -translate-x-2/4"
          >
            <img src="/next.svg" alt="arrow next" />
          </button>
        )}
      </div>
    </>
  );
};
