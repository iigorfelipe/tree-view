import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/theme';

export const Home = () => {
  const { isSmDown } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="bg-home min-h-[120vh] w-full flex items-center justify-center px-8">
      <div
        className="relative -mt-[40vh]
      "
      >
        <img src="home-msg.png" alt="home message" className="w-full h-auto" />
        {isSmDown && (
          <button
            onClick={() => navigate('/tree-view/companies')}
            className="cursor-pointer bg-transparent border-none p-0 absolute -bottom-2/3 left-2/4 transform -translate-x-2/4"
          >
            <img src="next.svg" alt="arrow next" />
          </button>
        )}
      </div>
    </div>
  );
};
