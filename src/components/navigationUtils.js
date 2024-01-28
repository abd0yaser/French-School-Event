import { useNavigate } from "react-router-dom";

export const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateToBookForm = () => {
    navigate("/BookForm");
  };

  return { navigateToBookForm };
};
