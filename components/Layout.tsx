import Navbar from './navbar'
// import Footer from './footer'
import Sidebar from './Sidebar'
import { createContext, useEffect, useState } from 'react'
import { PageWrapper } from './styled/PageWrapper';
import Footer from './footer';
import styles from '../styles/Layout.module.css';

import { debounce } from '../utilities/debounce';
import Feedback from './feedback';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { hideFeedback } from '../features/feedbackSlice';
import { setLoggedInState } from '../features/authSlice';
import classNames from 'classnames';
import { getCategories } from '../services/category-services';
import api from '../features/api';
import Loader from './Loader';
// import { isLoggedIn } from '../services/auth-services';


export const CategoriesContext = createContext<any>(null);

export default function Layout({ children }: any) {
  const { data: cart, isLoading: isCartLoading, refetch: refetchCart, isSuccess: isCartSucces } = api.useGetCartQuery(undefined);
  const { data: favorites, isLoading: isFavoritesLoading, refetch: refetchFavorites } = api.useGetFavoritesQuery(undefined);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const [showFeedback, setShowFeedback] = useState(false);
  const [ratio, setRatio] = useState(10)
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  // const isLogged = isLoggedIn(dispatch);

  // const isLogged = localStorage.getItem('access_token');
  // dispatch(
  //     setLoggedInState({loggedIn: !!isLogged}),
  // )

  const showFeedback = useSelector((state: RootState) => state.feedback.show);
  const feedbackType = useSelector((state: RootState) => state.feedback.type!);

  const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile, isSuccess: isProfileSucces } = api.useProfileQuery(undefined);

  const displayName = profile?.profile?.user.first_name;

  useEffect(() => {
    document.documentElement.style.fontSize = `${ratio}px`;

  }, [ratio]);


  // useEffect(()=> {
  //   document.body.style.overflow = showFeedback ? "hidden" :"auto";

  // }, [showFeedback]) 

  useEffect(() => {
    const val = calcRatio(window);
    setRatio(val);

    const isLogged = localStorage.getItem('access_token');
    dispatch(
      setLoggedInState({ loggedIn: !!isLogged }),
    )

    const debouncedHandleResize = debounce(function handleResize() {
      const val = calcRatio(window);
      setRatio(val);
    }, 500);


    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch(err => console.log(err));

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    }
  }, [])

  const calcRatio = (win: Window): number => {
    // if (win.innerWidth >= 1024) {
    const val = (win.innerWidth / 1920) * 10;
    return val;
    // } else {
    //   const val = (1024 / 1920) * 10;        
    //   return val;        
    // }
  }

  const _closeSidebar = () => {
    setOpenSidebar(false);
    document.body.style.overflow = "auto"
  }

  const _openSidebar = () => {
    document.body.style.overflow = "hidden"
    setOpenSidebar(true)
  }

  const _hideFeedback = () => {
    dispatch(
      hideFeedback({
        show: false,
      })
    )
  }


  const typeClasses = {
    error: styles.error,

    success: styles.success,

    info: styles.info,
  }

  const typeClass = typeClasses[feedbackType];
  const feedbackClasses = classNames({
    [styles.feedback]: true,
    [typeClass]: true,
  })

  return (
    <>
      {/* {openSidebar && <div className={styles['sidebar-overlay-global']} onClick={_closeSidebar}></div>} */}
      {showFeedback && feedbackType === 'info' && <div onClick={_hideFeedback} className={styles['blur-overlay-global']}></div>}
      {showFeedback && <Feedback className={feedbackClasses} />}
      {openSidebar && <Sidebar onSidebarClose={_closeSidebar} categories={categories} />}

      {isCartLoading || isFavoritesLoading ? <Loader /> : !cart || !favorites ? (<span>Not Found</span>) : (

        <Navbar
          cart={cart}
          favorite={favorites}
          onSidebarOpen={_openSidebar}
          displayName={displayName}
        />)}

      <h1>{cart?.items?.length}</h1>
      <CategoriesContext.Provider value={categories}>
        <PageWrapper>{children}</PageWrapper>
      </CategoriesContext.Provider>
      <Footer />
    </>
  )
}