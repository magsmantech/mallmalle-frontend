const media = {
    mobile: "@media (max-width: 767px)",  //includes iPhone/others portrait 375
    tablet: "@media (min-width: 768px) and (max-width: 1199px)",  //includes iPad landscape 1024
    laptop: "@media (min-width: 1200px) and (max-width: 1366px)",  //includes ALL laptops and desktop workstations
    desktop: "@media (min-width: 1367px) and (max-width: 1920px)",  // only fullHD monitors
    fullHD: "@media (min-width: 1920px)",  //last breakpoint
    sideBar: {
        mobile: "@media (max-width: 1199px)",
    }
};

export default media;