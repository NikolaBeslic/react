export default `
/*-- ===============================================

Product: 'Papr || HTML Template for News & Magazine'
Version: 1.0.1
Author: axilweb
Date Created: Oct 14, 2022

==================================================== --*/
/*-- == Table of contents =====================

( Example: Type 'ctrl+f' and then 'variables' to jump to the
 "example" section. Click 'find' if needed.)

//Defaults
-------------------------------


//components
------------------------------
* buttons.less';
* lang-dropdown.less';
* form.less';
* social_share.less';
* header/navbar.less';
* breadcrumb.less';
* shape.less';
* posts.less';
* content-block.less';
* newsletter-block.less';
* banner.less';
* banner-slider.less';
* banner-cat-counter.less';
* post_details.less';
* header/header_top.less';
* header/sidenav.less';
* footer/page_footer.less';
* plyr.less';
* isotop.less';
* team.less';
* contact.less';
* error-404.less';
* under-construction';
* author-details';
* subscribe-popup.less';

//widgets
-----------------------------
* widget';
* category';
* sidebar-social-share';
* sidebar-post';
* instagram-post';
* add-widget';
* tag-widget';
* media_queries';


================================================== --*/
/*--imported fonts--*/
@font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLm21lVF9eL.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiGyp8kv8JHgFVrJJLucHtF.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLmg1hVF9eL.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLmr19VF9eL.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLmy15VF9eL.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLm111VF9eL.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1xlEA.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfedw.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlEA.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlEA.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlEA.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDD4Z1xlEA.ttf) format('truetype');
}

@font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLBT5Z1xlEA.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOjCnqEu92Fr1Mu51TjASc6CsE.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1Mu51xIIzc.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOjCnqEu92Fr1Mu51S7ACc6CsE.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOjCnqEu92Fr1Mu51TzBic6CsE.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOjCnqEu92Fr1Mu51TLBCc6CsE.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5fBBc9.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9fBBc9.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf) format('truetype');
}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmYUtfBBc9.ttf) format('truetype');
}

/*--Custom Variables--*/
:root {
    --primary-font: 'Poppins', sans-serif;
    --secondary-font: 'Roboto', sans-serif;
    --font-awesome: 'Font Awesome 5 Pro';
    --primary-color: #FF2C54;
    --secondary-color: #FF9500;
    --action-color: #FECC00;
    --grey-dark-key: #000;
    --grey-dark-one: #121213;
    --grey-dark-two: #494E51;
    --grey-dark-three: #6B7074;
    --grey-dark-four: #7b7b7b;
    --grey-dark-five: #2B2B2B;
    --grey-dark-six: #cecece;
    --grey-dark-seven: #1a1a1a;
    --grey-dark-eight: #3f3f3f;
    --grey-mid: #C1C6C9;
    --grey-light-one: #D3D7DA;
    --grey-light-two: #F0F0F0;
    --grey-light-three: #F9F9F9;
    --border-color: #E6E6E6;
    --color-white: #fff;
    --color-success: #3EB75E;
    --color-warning: #FF8F3C;
    --color-info: #1BA2DB;
    --color-danger: #FF0003;
    --color-facebook: #3B5997;
    --color-twitter: #1BA1F2;
    --color-youtube: #ED4141;
    --color-linkedin: #0077B5;
    --color-pinterest: #E60022;
    --color-instagram: #C231A1;
    --color-vimeo: #00ADEF;
    --color-twitch: #6441A3;
    --color-green-one: #4CD965;
    --color-green-two: #3CD289;
    --color-green-three: #008079;
    --color-blue-one: #007AFF;
    --color-blue-two: #5AC8FA;
    --color-blue-three: #01ABF2;
    --color-blue-four: #4C8EBC;
    --color-red-one: #FF3A30;
    --color-red-two: #FF4F00;
    --color-purple-one: #5856D5;
    --color-purple-two: #CA9CF4;
    --color-yellow-one: #FFD400;
    --color-yellow-two: #FDE953;
    --color-blue-grey-one: #3F5573;
    --radius: 4px;
    --radius-big: 6px;
    --radius-small: 2px;
    --p-light: 300;
    --p-regular: 400;
    --p-medium: 500;
    --p-semi-bold: 600;
    --p-bold: 700;
    --p-extra-bold: 800;
    --p-black: 900;
    --s-light: 300;
    --s-regular: 400;
    --s-medium: 500;
    --s-bold: 700;
    --s-black: 900;
    --shadow-light: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    --shadow-dark: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    --cubic-easing: cubic-bezier(0.86, 0, 0.07, 1);
}

/*--Spacing--*/
.m-xs-0 {
    margin: 0rem !important;
}

.m-t-xs-0 {
    margin-top: 0rem !important;
}

.m-r-xs-0 {
    margin-right: 0rem !important;
}

.m-b-xs-0 {
    margin-bottom: 0rem !important;
}

.m-l-xs-0 {
    margin-left: 0rem !important;
}

.m-xs-5 {
    margin: 0.5rem !important;
}

.m-t-xs-5 {
    margin-top: 0.5rem !important;
}

.m-r-xs-5 {
    margin-right: 0.5rem !important;
}

.m-b-xs-5 {
    margin-bottom: 0.5rem !important;
}

.m-l-xs-5 {
    margin-left: 0.5rem !important;
}

.m-xs-10 {
    margin: 1rem !important;
}

.m-t-xs-10 {
    margin-top: 1rem !important;
}

.m-r-xs-10 {
    margin-right: 1rem !important;
}

.m-b-xs-10 {
    margin-bottom: 1rem !important;
}

.m-l-xs-10 {
    margin-left: 1rem !important;
}

.m-xs-15 {
    margin: 1.5rem !important;
}

.m-t-xs-15 {
    margin-top: 1.5rem !important;
}

.m-r-xs-15 {
    margin-right: 1.5rem !important;
}

.m-b-xs-15 {
    margin-bottom: 1.5rem !important;
}

.m-l-xs-15 {
    margin-left: 1.5rem !important;
}

.m-xs-20 {
    margin: 2rem !important;
}

.m-t-xs-20 {
    margin-top: 2rem !important;
}

.m-r-xs-20 {
    margin-right: 2rem !important;
}

.m-b-xs-20 {
    margin-bottom: 2rem !important;
}

.m-l-xs-20 {
    margin-left: 2rem !important;
}

.m-xs-25 {
    margin: 2.5rem !important;
}

.m-t-xs-25 {
    margin-top: 2.5rem !important;
}

.m-r-xs-25 {
    margin-right: 2.5rem !important;
}

.m-b-xs-25 {
    margin-bottom: 2.5rem !important;
}

.m-l-xs-25 {
    margin-left: 2.5rem !important;
}

.m-xs-30 {
    margin: 3rem !important;
}

.m-t-xs-30 {
    margin-top: 3rem !important;
}

.m-r-xs-30 {
    margin-right: 3rem !important;
}

.m-b-xs-30 {
    margin-bottom: 3rem !important;
}

.m-l-xs-30 {
    margin-left: 3rem !important;
}

.m-xs-35 {
    margin: 3.5rem !important;
}

.m-t-xs-35 {
    margin-top: 3.5rem !important;
}

.m-r-xs-35 {
    margin-right: 3.5rem !important;
}

.m-b-xs-35 {
    margin-bottom: 3.5rem !important;
}

.m-l-xs-35 {
    margin-left: 3.5rem !important;
}

.m-xs-40 {
    margin: 4rem !important;
}

.m-t-xs-40 {
    margin-top: 4rem !important;
}

.m-r-xs-40 {
    margin-right: 4rem !important;
}

.m-b-xs-40 {
    margin-bottom: 4rem !important;
}

.m-l-xs-40 {
    margin-left: 4rem !important;
}

.m-xs-45 {
    margin: 4.5rem !important;
}

.m-t-xs-45 {
    margin-top: 4.5rem !important;
}

.m-r-xs-45 {
    margin-right: 4.5rem !important;
}

.m-b-xs-45 {
    margin-bottom: 4.5rem !important;
}

.m-l-xs-45 {
    margin-left: 4.5rem !important;
}

.m-xs-50 {
    margin: 5rem !important;
}

.m-t-xs-50 {
    margin-top: 5rem !important;
}

.m-r-xs-50 {
    margin-right: 5rem !important;
}

.m-b-xs-50 {
    margin-bottom: 5rem !important;
}

.m-l-xs-50 {
    margin-left: 5rem !important;
}

.m-xs-55 {
    margin: 5.5rem !important;
}

.m-t-xs-55 {
    margin-top: 5.5rem !important;
}

.m-r-xs-55 {
    margin-right: 5.5rem !important;
}

.m-b-xs-55 {
    margin-bottom: 5.5rem !important;
}

.m-l-xs-55 {
    margin-left: 5.5rem !important;
}

.m-xs-60 {
    margin: 6rem !important;
}

.m-t-xs-60 {
    margin-top: 6rem !important;
}

.m-r-xs-60 {
    margin-right: 6rem !important;
}

.m-b-xs-60 {
    margin-bottom: 6rem !important;
}

.m-l-xs-60 {
    margin-left: 6rem !important;
}

.m-xs-65 {
    margin: 6.5rem !important;
}

.m-t-xs-65 {
    margin-top: 6.5rem !important;
}

.m-r-xs-65 {
    margin-right: 6.5rem !important;
}

.m-b-xs-65 {
    margin-bottom: 6.5rem !important;
}

.m-l-xs-65 {
    margin-left: 6.5rem !important;
}

.m-xs-70 {
    margin: 7rem !important;
}

.m-t-xs-70 {
    margin-top: 7rem !important;
}

.m-r-xs-70 {
    margin-right: 7rem !important;
}

.m-b-xs-70 {
    margin-bottom: 7rem !important;
}

.m-l-xs-70 {
    margin-left: 7rem !important;
}

.m-xs-75 {
    margin: 7.5rem !important;
}

.m-t-xs-75 {
    margin-top: 7.5rem !important;
}

.m-r-xs-75 {
    margin-right: 7.5rem !important;
}

.m-b-xs-75 {
    margin-bottom: 7.5rem !important;
}

.m-l-xs-75 {
    margin-left: 7.5rem !important;
}

.m-xs-80 {
    margin: 8rem !important;
}

.m-t-xs-80 {
    margin-top: 8rem !important;
}

.m-r-xs-80 {
    margin-right: 8rem !important;
}

.m-b-xs-80 {
    margin-bottom: 8rem !important;
}

.m-l-xs-80 {
    margin-left: 8rem !important;
}

.m-xs-85 {
    margin: 8.5rem !important;
}

.m-t-xs-85 {
    margin-top: 8.5rem !important;
}

.m-r-xs-85 {
    margin-right: 8.5rem !important;
}

.m-b-xs-85 {
    margin-bottom: 8.5rem !important;
}

.m-l-xs-85 {
    margin-left: 8.5rem !important;
}

.m-xs-90 {
    margin: 9rem !important;
}

.m-t-xs-90 {
    margin-top: 9rem !important;
}

.m-r-xs-90 {
    margin-right: 9rem !important;
}

.m-b-xs-90 {
    margin-bottom: 9rem !important;
}

.m-l-xs-90 {
    margin-left: 9rem !important;
}

.m-xs-95 {
    margin: 9.5rem !important;
}

.m-t-xs-95 {
    margin-top: 9.5rem !important;
}

.m-r-xs-95 {
    margin-right: 9.5rem !important;
}

.m-b-xs-95 {
    margin-bottom: 9.5rem !important;
}

.m-l-xs-95 {
    margin-left: 9.5rem !important;
}

.m-xs-100 {
    margin: 10rem !important;
}

.m-t-xs-100 {
    margin-top: 10rem !important;
}

.m-r-xs-100 {
    margin-right: 10rem !important;
}

.m-b-xs-100 {
    margin-bottom: 10rem !important;
}

.m-l-xs-100 {
    margin-left: 10rem !important;
}

@media (min-width: 768px) {
    .m-sm-0 {
        margin: 0rem !important;
    }

    .m-t-sm-0 {
        margin-top: 0rem !important;
    }

    .m-r-sm-0 {
        margin-right: 0rem !important;
    }

    .m-b-sm-0 {
        margin-bottom: 0rem !important;
    }

    .m-l-sm-0 {
        margin-left: 0rem !important;
    }

    .m-sm-5 {
        margin: 0.5rem !important;
    }

    .m-t-sm-5 {
        margin-top: 0.5rem !important;
    }

    .m-r-sm-5 {
        margin-right: 0.5rem !important;
    }

    .m-b-sm-5 {
        margin-bottom: 0.5rem !important;
    }

    .m-l-sm-5 {
        margin-left: 0.5rem !important;
    }

    .m-sm-10 {
        margin: 1rem !important;
    }

    .m-t-sm-10 {
        margin-top: 1rem !important;
    }

    .m-r-sm-10 {
        margin-right: 1rem !important;
    }

    .m-b-sm-10 {
        margin-bottom: 1rem !important;
    }

    .m-l-sm-10 {
        margin-left: 1rem !important;
    }

    .m-sm-15 {
        margin: 1.5rem !important;
    }

    .m-t-sm-15 {
        margin-top: 1.5rem !important;
    }

    .m-r-sm-15 {
        margin-right: 1.5rem !important;
    }

    .m-b-sm-15 {
        margin-bottom: 1.5rem !important;
    }

    .m-l-sm-15 {
        margin-left: 1.5rem !important;
    }

    .m-sm-20 {
        margin: 2rem !important;
    }

    .m-t-sm-20 {
        margin-top: 2rem !important;
    }

    .m-r-sm-20 {
        margin-right: 2rem !important;
    }

    .m-b-sm-20 {
        margin-bottom: 2rem !important;
    }

    .m-l-sm-20 {
        margin-left: 2rem !important;
    }

    .m-sm-25 {
        margin: 2.5rem !important;
    }

    .m-t-sm-25 {
        margin-top: 2.5rem !important;
    }

    .m-r-sm-25 {
        margin-right: 2.5rem !important;
    }

    .m-b-sm-25 {
        margin-bottom: 2.5rem !important;
    }

    .m-l-sm-25 {
        margin-left: 2.5rem !important;
    }

    .m-sm-30 {
        margin: 3rem !important;
    }

    .m-t-sm-30 {
        margin-top: 3rem !important;
    }

    .m-r-sm-30 {
        margin-right: 3rem !important;
    }

    .m-b-sm-30 {
        margin-bottom: 3rem !important;
    }

    .m-l-sm-30 {
        margin-left: 3rem !important;
    }

    .m-sm-35 {
        margin: 3.5rem !important;
    }

    .m-t-sm-35 {
        margin-top: 3.5rem !important;
    }

    .m-r-sm-35 {
        margin-right: 3.5rem !important;
    }

    .m-b-sm-35 {
        margin-bottom: 3.5rem !important;
    }

    .m-l-sm-35 {
        margin-left: 3.5rem !important;
    }

    .m-sm-40 {
        margin: 4rem !important;
    }

    .m-t-sm-40 {
        margin-top: 4rem !important;
    }

    .m-r-sm-40 {
        margin-right: 4rem !important;
    }

    .m-b-sm-40 {
        margin-bottom: 4rem !important;
    }

    .m-l-sm-40 {
        margin-left: 4rem !important;
    }

    .m-sm-45 {
        margin: 4.5rem !important;
    }

    .m-t-sm-45 {
        margin-top: 4.5rem !important;
    }

    .m-r-sm-45 {
        margin-right: 4.5rem !important;
    }

    .m-b-sm-45 {
        margin-bottom: 4.5rem !important;
    }

    .m-l-sm-45 {
        margin-left: 4.5rem !important;
    }

    .m-sm-50 {
        margin: 5rem !important;
    }

    .m-t-sm-50 {
        margin-top: 5rem !important;
    }

    .m-r-sm-50 {
        margin-right: 5rem !important;
    }

    .m-b-sm-50 {
        margin-bottom: 5rem !important;
    }

    .m-l-sm-50 {
        margin-left: 5rem !important;
    }

    .m-sm-55 {
        margin: 5.5rem !important;
    }

    .m-t-sm-55 {
        margin-top: 5.5rem !important;
    }

    .m-r-sm-55 {
        margin-right: 5.5rem !important;
    }

    .m-b-sm-55 {
        margin-bottom: 5.5rem !important;
    }

    .m-l-sm-55 {
        margin-left: 5.5rem !important;
    }

    .m-sm-60 {
        margin: 6rem !important;
    }

    .m-t-sm-60 {
        margin-top: 6rem !important;
    }

    .m-r-sm-60 {
        margin-right: 6rem !important;
    }

    .m-b-sm-60 {
        margin-bottom: 6rem !important;
    }

    .m-l-sm-60 {
        margin-left: 6rem !important;
    }

    .m-sm-65 {
        margin: 6.5rem !important;
    }

    .m-t-sm-65 {
        margin-top: 6.5rem !important;
    }

    .m-r-sm-65 {
        margin-right: 6.5rem !important;
    }

    .m-b-sm-65 {
        margin-bottom: 6.5rem !important;
    }

    .m-l-sm-65 {
        margin-left: 6.5rem !important;
    }

    .m-sm-70 {
        margin: 7rem !important;
    }

    .m-t-sm-70 {
        margin-top: 7rem !important;
    }

    .m-r-sm-70 {
        margin-right: 7rem !important;
    }

    .m-b-sm-70 {
        margin-bottom: 7rem !important;
    }

    .m-l-sm-70 {
        margin-left: 7rem !important;
    }

    .m-sm-75 {
        margin: 7.5rem !important;
    }

    .m-t-sm-75 {
        margin-top: 7.5rem !important;
    }

    .m-r-sm-75 {
        margin-right: 7.5rem !important;
    }

    .m-b-sm-75 {
        margin-bottom: 7.5rem !important;
    }

    .m-l-sm-75 {
        margin-left: 7.5rem !important;
    }

    .m-sm-80 {
        margin: 8rem !important;
    }

    .m-t-sm-80 {
        margin-top: 8rem !important;
    }

    .m-r-sm-80 {
        margin-right: 8rem !important;
    }

    .m-b-sm-80 {
        margin-bottom: 8rem !important;
    }

    .m-l-sm-80 {
        margin-left: 8rem !important;
    }

    .m-sm-85 {
        margin: 8.5rem !important;
    }

    .m-t-sm-85 {
        margin-top: 8.5rem !important;
    }

    .m-r-sm-85 {
        margin-right: 8.5rem !important;
    }

    .m-b-sm-85 {
        margin-bottom: 8.5rem !important;
    }

    .m-l-sm-85 {
        margin-left: 8.5rem !important;
    }

    .m-sm-90 {
        margin: 9rem !important;
    }

    .m-t-sm-90 {
        margin-top: 9rem !important;
    }

    .m-r-sm-90 {
        margin-right: 9rem !important;
    }

    .m-b-sm-90 {
        margin-bottom: 9rem !important;
    }

    .m-l-sm-90 {
        margin-left: 9rem !important;
    }

    .m-sm-95 {
        margin: 9.5rem !important;
    }

    .m-t-sm-95 {
        margin-top: 9.5rem !important;
    }

    .m-r-sm-95 {
        margin-right: 9.5rem !important;
    }

    .m-b-sm-95 {
        margin-bottom: 9.5rem !important;
    }

    .m-l-sm-95 {
        margin-left: 9.5rem !important;
    }

    .m-sm-100 {
        margin: 10rem !important;
    }

    .m-t-sm-100 {
        margin-top: 10rem !important;
    }

    .m-r-sm-100 {
        margin-right: 10rem !important;
    }

    .m-b-sm-100 {
        margin-bottom: 10rem !important;
    }

    .m-l-sm-100 {
        margin-left: 10rem !important;
    }
}

@media (min-width: 992px) {
    .m-md-0 {
        margin: 0rem !important;
    }

    .m-t-md-0 {
        margin-top: 0rem !important;
    }

    .m-r-md-0 {
        margin-right: 0rem !important;
    }

    .m-b-md-0 {
        margin-bottom: 0rem !important;
    }

    .m-l-md-0 {
        margin-left: 0rem !important;
    }

    .m-md-5 {
        margin: 0.5rem !important;
    }

    .m-t-md-5 {
        margin-top: 0.5rem !important;
    }

    .m-r-md-5 {
        margin-right: 0.5rem !important;
    }

    .m-b-md-5 {
        margin-bottom: 0.5rem !important;
    }

    .m-l-md-5 {
        margin-left: 0.5rem !important;
    }

    .m-md-10 {
        margin: 1rem !important;
    }

    .m-t-md-10 {
        margin-top: 1rem !important;
    }

    .m-r-md-10 {
        margin-right: 1rem !important;
    }

    .m-b-md-10 {
        margin-bottom: 1rem !important;
    }

    .m-l-md-10 {
        margin-left: 1rem !important;
    }

    .m-md-15 {
        margin: 1.5rem !important;
    }

    .m-t-md-15 {
        margin-top: 1.5rem !important;
    }

    .m-r-md-15 {
        margin-right: 1.5rem !important;
    }

    .m-b-md-15 {
        margin-bottom: 1.5rem !important;
    }

    .m-l-md-15 {
        margin-left: 1.5rem !important;
    }

    .m-md-20 {
        margin: 2rem !important;
    }

    .m-t-md-20 {
        margin-top: 2rem !important;
    }

    .m-r-md-20 {
        margin-right: 2rem !important;
    }

    .m-b-md-20 {
        margin-bottom: 2rem !important;
    }

    .m-l-md-20 {
        margin-left: 2rem !important;
    }

    .m-md-25 {
        margin: 2.5rem !important;
    }

    .m-t-md-25 {
        margin-top: 2.5rem !important;
    }

    .m-r-md-25 {
        margin-right: 2.5rem !important;
    }

    .m-b-md-25 {
        margin-bottom: 2.5rem !important;
    }

    .m-l-md-25 {
        margin-left: 2.5rem !important;
    }

    .m-md-30 {
        margin: 3rem !important;
    }

    .m-t-md-30 {
        margin-top: 3rem !important;
    }

    .m-r-md-30 {
        margin-right: 3rem !important;
    }

    .m-b-md-30 {
        margin-bottom: 3rem !important;
    }

    .m-l-md-30 {
        margin-left: 3rem !important;
    }

    .m-md-35 {
        margin: 3.5rem !important;
    }

    .m-t-md-35 {
        margin-top: 3.5rem !important;
    }

    .m-r-md-35 {
        margin-right: 3.5rem !important;
    }

    .m-b-md-35 {
        margin-bottom: 3.5rem !important;
    }

    .m-l-md-35 {
        margin-left: 3.5rem !important;
    }

    .m-md-40 {
        margin: 4rem !important;
    }

    .m-t-md-40 {
        margin-top: 4rem !important;
    }

    .m-r-md-40 {
        margin-right: 4rem !important;
    }

    .m-b-md-40 {
        margin-bottom: 4rem !important;
    }

    .m-l-md-40 {
        margin-left: 4rem !important;
    }

    .m-md-45 {
        margin: 4.5rem !important;
    }

    .m-t-md-45 {
        margin-top: 4.5rem !important;
    }

    .m-r-md-45 {
        margin-right: 4.5rem !important;
    }

    .m-b-md-45 {
        margin-bottom: 4.5rem !important;
    }

    .m-l-md-45 {
        margin-left: 4.5rem !important;
    }

    .m-md-50 {
        margin: 5rem !important;
    }

    .m-t-md-50 {
        margin-top: 5rem !important;
    }

    .m-r-md-50 {
        margin-right: 5rem !important;
    }

    .m-b-md-50 {
        margin-bottom: 5rem !important;
    }

    .m-l-md-50 {
        margin-left: 5rem !important;
    }

    .m-md-55 {
        margin: 5.5rem !important;
    }

    .m-t-md-55 {
        margin-top: 5.5rem !important;
    }

    .m-r-md-55 {
        margin-right: 5.5rem !important;
    }

    .m-b-md-55 {
        margin-bottom: 5.5rem !important;
    }

    .m-l-md-55 {
        margin-left: 5.5rem !important;
    }

    .m-md-60 {
        margin: 6rem !important;
    }

    .m-t-md-60 {
        margin-top: 6rem !important;
    }

    .m-r-md-60 {
        margin-right: 6rem !important;
    }

    .m-b-md-60 {
        margin-bottom: 6rem !important;
    }

    .m-l-md-60 {
        margin-left: 6rem !important;
    }

    .m-md-65 {
        margin: 6.5rem !important;
    }

    .m-t-md-65 {
        margin-top: 6.5rem !important;
    }

    .m-r-md-65 {
        margin-right: 6.5rem !important;
    }

    .m-b-md-65 {
        margin-bottom: 6.5rem !important;
    }

    .m-l-md-65 {
        margin-left: 6.5rem !important;
    }

    .m-md-70 {
        margin: 7rem !important;
    }

    .m-t-md-70 {
        margin-top: 7rem !important;
    }

    .m-r-md-70 {
        margin-right: 7rem !important;
    }

    .m-b-md-70 {
        margin-bottom: 7rem !important;
    }

    .m-l-md-70 {
        margin-left: 7rem !important;
    }

    .m-md-75 {
        margin: 7.5rem !important;
    }

    .m-t-md-75 {
        margin-top: 7.5rem !important;
    }

    .m-r-md-75 {
        margin-right: 7.5rem !important;
    }

    .m-b-md-75 {
        margin-bottom: 7.5rem !important;
    }

    .m-l-md-75 {
        margin-left: 7.5rem !important;
    }

    .m-md-80 {
        margin: 8rem !important;
    }

    .m-t-md-80 {
        margin-top: 8rem !important;
    }

    .m-r-md-80 {
        margin-right: 8rem !important;
    }

    .m-b-md-80 {
        margin-bottom: 8rem !important;
    }

    .m-l-md-80 {
        margin-left: 8rem !important;
    }

    .m-md-85 {
        margin: 8.5rem !important;
    }

    .m-t-md-85 {
        margin-top: 8.5rem !important;
    }

    .m-r-md-85 {
        margin-right: 8.5rem !important;
    }

    .m-b-md-85 {
        margin-bottom: 8.5rem !important;
    }

    .m-l-md-85 {
        margin-left: 8.5rem !important;
    }

    .m-md-90 {
        margin: 9rem !important;
    }

    .m-t-md-90 {
        margin-top: 9rem !important;
    }

    .m-r-md-90 {
        margin-right: 9rem !important;
    }

    .m-b-md-90 {
        margin-bottom: 9rem !important;
    }

    .m-l-md-90 {
        margin-left: 9rem !important;
    }

    .m-md-95 {
        margin: 9.5rem !important;
    }

    .m-t-md-95 {
        margin-top: 9.5rem !important;
    }

    .m-r-md-95 {
        margin-right: 9.5rem !important;
    }

    .m-b-md-95 {
        margin-bottom: 9.5rem !important;
    }

    .m-l-md-95 {
        margin-left: 9.5rem !important;
    }

    .m-md-100 {
        margin: 10rem !important;
    }

    .m-t-md-100 {
        margin-top: 10rem !important;
    }

    .m-r-md-100 {
        margin-right: 10rem !important;
    }

    .m-b-md-100 {
        margin-bottom: 10rem !important;
    }

    .m-l-md-100 {
        margin-left: 10rem !important;
    }
}

@media (min-width: 1200px) {
    .m-lg-0 {
        margin: 0rem !important;
    }

    .m-t-lg-0 {
        margin-top: 0rem !important;
    }

    .m-r-lg-0 {
        margin-right: 0rem !important;
    }

    .m-b-lg-0 {
        margin-bottom: 0rem !important;
    }

    .m-l-lg-0 {
        margin-left: 0rem !important;
    }

    .m-lg-5 {
        margin: 0.5rem !important;
    }

    .m-t-lg-5 {
        margin-top: 0.5rem !important;
    }

    .m-r-lg-5 {
        margin-right: 0.5rem !important;
    }

    .m-b-lg-5 {
        margin-bottom: 0.5rem !important;
    }

    .m-l-lg-5 {
        margin-left: 0.5rem !important;
    }

    .m-lg-10 {
        margin: 1rem !important;
    }

    .m-t-lg-10 {
        margin-top: 1rem !important;
    }

    .m-r-lg-10 {
        margin-right: 1rem !important;
    }

    .m-b-lg-10 {
        margin-bottom: 1rem !important;
    }

    .m-l-lg-10 {
        margin-left: 1rem !important;
    }

    .m-lg-15 {
        margin: 1.5rem !important;
    }

    .m-t-lg-15 {
        margin-top: 1.5rem !important;
    }

    .m-r-lg-15 {
        margin-right: 1.5rem !important;
    }

    .m-b-lg-15 {
        margin-bottom: 1.5rem !important;
    }

    .m-l-lg-15 {
        margin-left: 1.5rem !important;
    }

    .m-lg-20 {
        margin: 2rem !important;
    }

    .m-t-lg-20 {
        margin-top: 2rem !important;
    }

    .m-r-lg-20 {
        margin-right: 2rem !important;
    }

    .m-b-lg-20 {
        margin-bottom: 2rem !important;
    }

    .m-l-lg-20 {
        margin-left: 2rem !important;
    }

    .m-lg-25 {
        margin: 2.5rem !important;
    }

    .m-t-lg-25 {
        margin-top: 2.5rem !important;
    }

    .m-r-lg-25 {
        margin-right: 2.5rem !important;
    }

    .m-b-lg-25 {
        margin-bottom: 2.5rem !important;
    }

    .m-l-lg-25 {
        margin-left: 2.5rem !important;
    }

    .m-lg-30 {
        margin: 3rem !important;
    }

    .m-t-lg-30 {
        margin-top: 3rem !important;
    }

    .m-r-lg-30 {
        margin-right: 3rem !important;
    }

    .m-b-lg-30 {
        margin-bottom: 3rem !important;
    }

    .m-l-lg-30 {
        margin-left: 3rem !important;
    }

    .m-lg-35 {
        margin: 3.5rem !important;
    }

    .m-t-lg-35 {
        margin-top: 3.5rem !important;
    }

    .m-r-lg-35 {
        margin-right: 3.5rem !important;
    }

    .m-b-lg-35 {
        margin-bottom: 3.5rem !important;
    }

    .m-l-lg-35 {
        margin-left: 3.5rem !important;
    }

    .m-lg-40 {
        margin: 4rem !important;
    }

    .m-t-lg-40 {
        margin-top: 4rem !important;
    }

    .m-r-lg-40 {
        margin-right: 4rem !important;
    }

    .m-b-lg-40 {
        margin-bottom: 4rem !important;
    }

    .m-l-lg-40 {
        margin-left: 4rem !important;
    }

    .m-lg-45 {
        margin: 4.5rem !important;
    }

    .m-t-lg-45 {
        margin-top: 4.5rem !important;
    }

    .m-r-lg-45 {
        margin-right: 4.5rem !important;
    }

    .m-b-lg-45 {
        margin-bottom: 4.5rem !important;
    }

    .m-l-lg-45 {
        margin-left: 4.5rem !important;
    }

    .m-lg-50 {
        margin: 5rem !important;
    }

    .m-t-lg-50 {
        margin-top: 5rem !important;
    }

    .m-r-lg-50 {
        margin-right: 5rem !important;
    }

    .m-b-lg-50 {
        margin-bottom: 5rem !important;
    }

    .m-l-lg-50 {
        margin-left: 5rem !important;
    }

    .m-lg-55 {
        margin: 5.5rem !important;
    }

    .m-t-lg-55 {
        margin-top: 5.5rem !important;
    }

    .m-r-lg-55 {
        margin-right: 5.5rem !important;
    }

    .m-b-lg-55 {
        margin-bottom: 5.5rem !important;
    }

    .m-l-lg-55 {
        margin-left: 5.5rem !important;
    }

    .m-lg-60 {
        margin: 6rem !important;
    }

    .m-t-lg-60 {
        margin-top: 6rem !important;
    }

    .m-r-lg-60 {
        margin-right: 6rem !important;
    }

    .m-b-lg-60 {
        margin-bottom: 6rem !important;
    }

    .m-l-lg-60 {
        margin-left: 6rem !important;
    }

    .m-lg-65 {
        margin: 6.5rem !important;
    }

    .m-t-lg-65 {
        margin-top: 6.5rem !important;
    }

    .m-r-lg-65 {
        margin-right: 6.5rem !important;
    }

    .m-b-lg-65 {
        margin-bottom: 6.5rem !important;
    }

    .m-l-lg-65 {
        margin-left: 6.5rem !important;
    }

    .m-lg-70 {
        margin: 7rem !important;
    }

    .m-t-lg-70 {
        margin-top: 7rem !important;
    }

    .m-r-lg-70 {
        margin-right: 7rem !important;
    }

    .m-b-lg-70 {
        margin-bottom: 7rem !important;
    }

    .m-l-lg-70 {
        margin-left: 7rem !important;
    }

    .m-lg-75 {
        margin: 7.5rem !important;
    }

    .m-t-lg-75 {
        margin-top: 7.5rem !important;
    }

    .m-r-lg-75 {
        margin-right: 7.5rem !important;
    }

    .m-b-lg-75 {
        margin-bottom: 7.5rem !important;
    }

    .m-l-lg-75 {
        margin-left: 7.5rem !important;
    }

    .m-lg-80 {
        margin: 8rem !important;
    }

    .m-t-lg-80 {
        margin-top: 8rem !important;
    }

    .m-r-lg-80 {
        margin-right: 8rem !important;
    }

    .m-b-lg-80 {
        margin-bottom: 8rem !important;
    }

    .m-l-lg-80 {
        margin-left: 8rem !important;
    }

    .m-lg-85 {
        margin: 8.5rem !important;
    }

    .m-t-lg-85 {
        margin-top: 8.5rem !important;
    }

    .m-r-lg-85 {
        margin-right: 8.5rem !important;
    }

    .m-b-lg-85 {
        margin-bottom: 8.5rem !important;
    }

    .m-l-lg-85 {
        margin-left: 8.5rem !important;
    }

    .m-lg-90 {
        margin: 9rem !important;
    }

    .m-t-lg-90 {
        margin-top: 9rem !important;
    }

    .m-r-lg-90 {
        margin-right: 9rem !important;
    }

    .m-b-lg-90 {
        margin-bottom: 9rem !important;
    }

    .m-l-lg-90 {
        margin-left: 9rem !important;
    }

    .m-lg-95 {
        margin: 9.5rem !important;
    }

    .m-t-lg-95 {
        margin-top: 9.5rem !important;
    }

    .m-r-lg-95 {
        margin-right: 9.5rem !important;
    }

    .m-b-lg-95 {
        margin-bottom: 9.5rem !important;
    }

    .m-l-lg-95 {
        margin-left: 9.5rem !important;
    }

    .m-lg-100 {
        margin: 10rem !important;
    }

    .m-t-lg-100 {
        margin-top: 10rem !important;
    }

    .m-r-lg-100 {
        margin-right: 10rem !important;
    }

    .m-b-lg-100 {
        margin-bottom: 10rem !important;
    }

    .m-l-lg-100 {
        margin-left: 10rem !important;
    }
}

.p-xs-0 {
    padding: 0rem !important;
}

.p-t-xs-0 {
    padding-top: 0rem !important;
}

.p-r-xs-0 {
    padding-right: 0rem !important;
}

.p-b-xs-0 {
    padding-bottom: 0rem !important;
}

.p-l-xs-0 {
    padding-left: 0rem !important;
}

.p-xs-5 {
    padding: 0.5rem !important;
}

.p-t-xs-5 {
    padding-top: 0.5rem !important;
}

.p-r-xs-5 {
    padding-right: 0.5rem !important;
}

.p-b-xs-5 {
    padding-bottom: 0.5rem !important;
}

.p-l-xs-5 {
    padding-left: 0.5rem !important;
}

.p-xs-10 {
    padding: 1rem !important;
}

.p-t-xs-10 {
    padding-top: 1rem !important;
}

.p-r-xs-10 {
    padding-right: 1rem !important;
}

.p-b-xs-10 {
    padding-bottom: 1rem !important;
}

.p-l-xs-10 {
    padding-left: 1rem !important;
}

.p-xs-15 {
    padding: 1.5rem !important;
}

.p-t-xs-15 {
    padding-top: 1.5rem !important;
}

.p-r-xs-15 {
    padding-right: 1.5rem !important;
}

.p-b-xs-15 {
    padding-bottom: 1.5rem !important;
}

.p-l-xs-15 {
    padding-left: 1.5rem !important;
}

.p-xs-20 {
    padding: 2rem !important;
}

.p-t-xs-20 {
    padding-top: 2rem !important;
}

.p-r-xs-20 {
    padding-right: 2rem !important;
}

.p-b-xs-20 {
    padding-bottom: 2rem !important;
}

.p-l-xs-20 {
    padding-left: 2rem !important;
}

.p-xs-25 {
    padding: 2.5rem !important;
}

.p-t-xs-25 {
    padding-top: 2.5rem !important;
}

.p-r-xs-25 {
    padding-right: 2.5rem !important;
}

.p-b-xs-25 {
    padding-bottom: 2.5rem !important;
}

.p-l-xs-25 {
    padding-left: 2.5rem !important;
}

.p-xs-30 {
    padding: 3rem !important;
}

.p-t-xs-30 {
    padding-top: 3rem !important;
}

.p-r-xs-30 {
    padding-right: 3rem !important;
}

.p-b-xs-30 {
    padding-bottom: 3rem !important;
}

.p-l-xs-30 {
    padding-left: 3rem !important;
}

.p-xs-35 {
    padding: 3.5rem !important;
}

.p-t-xs-35 {
    padding-top: 3.5rem !important;
}

.p-r-xs-35 {
    padding-right: 3.5rem !important;
}

.p-b-xs-35 {
    padding-bottom: 3.5rem !important;
}

.p-l-xs-35 {
    padding-left: 3.5rem !important;
}

.p-xs-40 {
    padding: 4rem !important;
}

.p-t-xs-40 {
    padding-top: 4rem !important;
}

.p-r-xs-40 {
    padding-right: 4rem !important;
}

.p-b-xs-40 {
    padding-bottom: 4rem !important;
}

.p-l-xs-40 {
    padding-left: 4rem !important;
}

.p-xs-45 {
    padding: 4.5rem !important;
}

.p-t-xs-45 {
    padding-top: 4.5rem !important;
}

.p-r-xs-45 {
    padding-right: 4.5rem !important;
}

.p-b-xs-45 {
    padding-bottom: 4.5rem !important;
}

.p-l-xs-45 {
    padding-left: 4.5rem !important;
}

.p-xs-50 {
    padding: 5rem !important;
}

.p-t-xs-50 {
    padding-top: 5rem !important;
}

.p-r-xs-50 {
    padding-right: 5rem !important;
}

.p-b-xs-50 {
    padding-bottom: 5rem !important;
}

.p-l-xs-50 {
    padding-left: 5rem !important;
}

.p-xs-55 {
    padding: 5.5rem !important;
}

.p-t-xs-55 {
    padding-top: 5.5rem !important;
}

.p-r-xs-55 {
    padding-right: 5.5rem !important;
}

.p-b-xs-55 {
    padding-bottom: 5.5rem !important;
}

.p-l-xs-55 {
    padding-left: 5.5rem !important;
}

.p-xs-60 {
    padding: 6rem !important;
}

.p-t-xs-60 {
    padding-top: 6rem !important;
}

.p-r-xs-60 {
    padding-right: 6rem !important;
}

.p-b-xs-60 {
    padding-bottom: 6rem !important;
}

.p-l-xs-60 {
    padding-left: 6rem !important;
}

.p-xs-65 {
    padding: 6.5rem !important;
}

.p-t-xs-65 {
    padding-top: 6.5rem !important;
}

.p-r-xs-65 {
    padding-right: 6.5rem !important;
}

.p-b-xs-65 {
    padding-bottom: 6.5rem !important;
}

.p-l-xs-65 {
    padding-left: 6.5rem !important;
}

.p-xs-70 {
    padding: 7rem !important;
}

.p-t-xs-70 {
    padding-top: 7rem !important;
}

.p-r-xs-70 {
    padding-right: 7rem !important;
}

.p-b-xs-70 {
    padding-bottom: 7rem !important;
}

.p-l-xs-70 {
    padding-left: 7rem !important;
}

.p-xs-75 {
    padding: 7.5rem !important;
}

.p-t-xs-75 {
    padding-top: 7.5rem !important;
}

.p-r-xs-75 {
    padding-right: 7.5rem !important;
}

.p-b-xs-75 {
    padding-bottom: 7.5rem !important;
}

.p-l-xs-75 {
    padding-left: 7.5rem !important;
}

.p-xs-80 {
    padding: 8rem !important;
}

.p-t-xs-80 {
    padding-top: 8rem !important;
}

.p-r-xs-80 {
    padding-right: 8rem !important;
}

.p-b-xs-80 {
    padding-bottom: 8rem !important;
}

.p-l-xs-80 {
    padding-left: 8rem !important;
}

.p-xs-85 {
    padding: 8.5rem !important;
}

.p-t-xs-85 {
    padding-top: 8.5rem !important;
}

.p-r-xs-85 {
    padding-right: 8.5rem !important;
}

.p-b-xs-85 {
    padding-bottom: 8.5rem !important;
}

.p-l-xs-85 {
    padding-left: 8.5rem !important;
}

.p-xs-90 {
    padding: 9rem !important;
}

.p-t-xs-90 {
    padding-top: 9rem !important;
}

.p-r-xs-90 {
    padding-right: 9rem !important;
}

.p-b-xs-90 {
    padding-bottom: 9rem !important;
}

.p-l-xs-90 {
    padding-left: 9rem !important;
}

.p-xs-95 {
    padding: 9.5rem !important;
}

.p-t-xs-95 {
    padding-top: 9.5rem !important;
}

.p-r-xs-95 {
    padding-right: 9.5rem !important;
}

.p-b-xs-95 {
    padding-bottom: 9.5rem !important;
}

.p-l-xs-95 {
    padding-left: 9.5rem !important;
}

.p-xs-100 {
    padding: 10rem !important;
}

.p-t-xs-100 {
    padding-top: 10rem !important;
}

.p-r-xs-100 {
    padding-right: 10rem !important;
}

.p-b-xs-100 {
    padding-bottom: 10rem !important;
}

.p-l-xs-100 {
    padding-left: 10rem !important;
}

@media (min-width: 768px) {
    .p-sm-0 {
        padding: 0rem !important;
    }

    .p-t-sm-0 {
        padding-top: 0rem !important;
    }

    .p-r-sm-0 {
        padding-right: 0rem !important;
    }

    .p-b-sm-0 {
        padding-bottom: 0rem !important;
    }

    .p-l-sm-0 {
        padding-left: 0rem !important;
    }

    .p-sm-5 {
        padding: 0.5rem !important;
    }

    .p-t-sm-5 {
        padding-top: 0.5rem !important;
    }

    .p-r-sm-5 {
        padding-right: 0.5rem !important;
    }

    .p-b-sm-5 {
        padding-bottom: 0.5rem !important;
    }

    .p-l-sm-5 {
        padding-left: 0.5rem !important;
    }

    .p-sm-10 {
        padding: 1rem !important;
    }

    .p-t-sm-10 {
        padding-top: 1rem !important;
    }

    .p-r-sm-10 {
        padding-right: 1rem !important;
    }

    .p-b-sm-10 {
        padding-bottom: 1rem !important;
    }

    .p-l-sm-10 {
        padding-left: 1rem !important;
    }

    .p-sm-15 {
        padding: 1.5rem !important;
    }

    .p-t-sm-15 {
        padding-top: 1.5rem !important;
    }

    .p-r-sm-15 {
        padding-right: 1.5rem !important;
    }

    .p-b-sm-15 {
        padding-bottom: 1.5rem !important;
    }

    .p-l-sm-15 {
        padding-left: 1.5rem !important;
    }

    .p-sm-20 {
        padding: 2rem !important;
    }

    .p-t-sm-20 {
        padding-top: 2rem !important;
    }

    .p-r-sm-20 {
        padding-right: 2rem !important;
    }

    .p-b-sm-20 {
        padding-bottom: 2rem !important;
    }

    .p-l-sm-20 {
        padding-left: 2rem !important;
    }

    .p-sm-25 {
        padding: 2.5rem !important;
    }

    .p-t-sm-25 {
        padding-top: 2.5rem !important;
    }

    .p-r-sm-25 {
        padding-right: 2.5rem !important;
    }

    .p-b-sm-25 {
        padding-bottom: 2.5rem !important;
    }

    .p-l-sm-25 {
        padding-left: 2.5rem !important;
    }

    .p-sm-30 {
        padding: 3rem !important;
    }

    .p-t-sm-30 {
        padding-top: 3rem !important;
    }

    .p-r-sm-30 {
        padding-right: 3rem !important;
    }

    .p-b-sm-30 {
        padding-bottom: 3rem !important;
    }

    .p-l-sm-30 {
        padding-left: 3rem !important;
    }

    .p-sm-35 {
        padding: 3.5rem !important;
    }

    .p-t-sm-35 {
        padding-top: 3.5rem !important;
    }

    .p-r-sm-35 {
        padding-right: 3.5rem !important;
    }

    .p-b-sm-35 {
        padding-bottom: 3.5rem !important;
    }

    .p-l-sm-35 {
        padding-left: 3.5rem !important;
    }

    .p-sm-40 {
        padding: 4rem !important;
    }

    .p-t-sm-40 {
        padding-top: 4rem !important;
    }

    .p-r-sm-40 {
        padding-right: 4rem !important;
    }

    .p-b-sm-40 {
        padding-bottom: 4rem !important;
    }

    .p-l-sm-40 {
        padding-left: 4rem !important;
    }

    .p-sm-45 {
        padding: 4.5rem !important;
    }

    .p-t-sm-45 {
        padding-top: 4.5rem !important;
    }

    .p-r-sm-45 {
        padding-right: 4.5rem !important;
    }

    .p-b-sm-45 {
        padding-bottom: 4.5rem !important;
    }

    .p-l-sm-45 {
        padding-left: 4.5rem !important;
    }

    .p-sm-50 {
        padding: 5rem !important;
    }

    .p-t-sm-50 {
        padding-top: 5rem !important;
    }

    .p-r-sm-50 {
        padding-right: 5rem !important;
    }

    .p-b-sm-50 {
        padding-bottom: 5rem !important;
    }

    .p-l-sm-50 {
        padding-left: 5rem !important;
    }

    .p-sm-55 {
        padding: 5.5rem !important;
    }

    .p-t-sm-55 {
        padding-top: 5.5rem !important;
    }

    .p-r-sm-55 {
        padding-right: 5.5rem !important;
    }

    .p-b-sm-55 {
        padding-bottom: 5.5rem !important;
    }

    .p-l-sm-55 {
        padding-left: 5.5rem !important;
    }

    .p-sm-60 {
        padding: 6rem !important;
    }

    .p-t-sm-60 {
        padding-top: 6rem !important;
    }

    .p-r-sm-60 {
        padding-right: 6rem !important;
    }

    .p-b-sm-60 {
        padding-bottom: 6rem !important;
    }

    .p-l-sm-60 {
        padding-left: 6rem !important;
    }

    .p-sm-65 {
        padding: 6.5rem !important;
    }

    .p-t-sm-65 {
        padding-top: 6.5rem !important;
    }

    .p-r-sm-65 {
        padding-right: 6.5rem !important;
    }

    .p-b-sm-65 {
        padding-bottom: 6.5rem !important;
    }

    .p-l-sm-65 {
        padding-left: 6.5rem !important;
    }

    .p-sm-70 {
        padding: 7rem !important;
    }

    .p-t-sm-70 {
        padding-top: 7rem !important;
    }

    .p-r-sm-70 {
        padding-right: 7rem !important;
    }

    .p-b-sm-70 {
        padding-bottom: 7rem !important;
    }

    .p-l-sm-70 {
        padding-left: 7rem !important;
    }

    .p-sm-75 {
        padding: 7.5rem !important;
    }

    .p-t-sm-75 {
        padding-top: 7.5rem !important;
    }

    .p-r-sm-75 {
        padding-right: 7.5rem !important;
    }

    .p-b-sm-75 {
        padding-bottom: 7.5rem !important;
    }

    .p-l-sm-75 {
        padding-left: 7.5rem !important;
    }

    .p-sm-80 {
        padding: 8rem !important;
    }

    .p-t-sm-80 {
        padding-top: 8rem !important;
    }

    .p-r-sm-80 {
        padding-right: 8rem !important;
    }

    .p-b-sm-80 {
        padding-bottom: 8rem !important;
    }

    .p-l-sm-80 {
        padding-left: 8rem !important;
    }

    .p-sm-85 {
        padding: 8.5rem !important;
    }

    .p-t-sm-85 {
        padding-top: 8.5rem !important;
    }

    .p-r-sm-85 {
        padding-right: 8.5rem !important;
    }

    .p-b-sm-85 {
        padding-bottom: 8.5rem !important;
    }

    .p-l-sm-85 {
        padding-left: 8.5rem !important;
    }

    .p-sm-90 {
        padding: 9rem !important;
    }

    .p-t-sm-90 {
        padding-top: 9rem !important;
    }

    .p-r-sm-90 {
        padding-right: 9rem !important;
    }

    .p-b-sm-90 {
        padding-bottom: 9rem !important;
    }

    .p-l-sm-90 {
        padding-left: 9rem !important;
    }

    .p-sm-95 {
        padding: 9.5rem !important;
    }

    .p-t-sm-95 {
        padding-top: 9.5rem !important;
    }

    .p-r-sm-95 {
        padding-right: 9.5rem !important;
    }

    .p-b-sm-95 {
        padding-bottom: 9.5rem !important;
    }

    .p-l-sm-95 {
        padding-left: 9.5rem !important;
    }

    .p-sm-100 {
        padding: 10rem !important;
    }

    .p-t-sm-100 {
        padding-top: 10rem !important;
    }

    .p-r-sm-100 {
        padding-right: 10rem !important;
    }

    .p-b-sm-100 {
        padding-bottom: 10rem !important;
    }

    .p-l-sm-100 {
        padding-left: 10rem !important;
    }
}

@media (min-width: 992px) {
    .p-md-0 {
        padding: 0rem !important;
    }

    .p-t-md-0 {
        padding-top: 0rem !important;
    }

    .p-r-md-0 {
        padding-right: 0rem !important;
    }

    .p-b-md-0 {
        padding-bottom: 0rem !important;
    }

    .p-l-md-0 {
        padding-left: 0rem !important;
    }

    .p-md-5 {
        padding: 0.5rem !important;
    }

    .p-t-md-5 {
        padding-top: 0.5rem !important;
    }

    .p-r-md-5 {
        padding-right: 0.5rem !important;
    }

    .p-b-md-5 {
        padding-bottom: 0.5rem !important;
    }

    .p-l-md-5 {
        padding-left: 0.5rem !important;
    }

    .p-md-10 {
        padding: 1rem !important;
    }

    .p-t-md-10 {
        padding-top: 1rem !important;
    }

    .p-r-md-10 {
        padding-right: 1rem !important;
    }

    .p-b-md-10 {
        padding-bottom: 1rem !important;
    }

    .p-l-md-10 {
        padding-left: 1rem !important;
    }

    .p-md-15 {
        padding: 1.5rem !important;
    }

    .p-t-md-15 {
        padding-top: 1.5rem !important;
    }

    .p-r-md-15 {
        padding-right: 1.5rem !important;
    }

    .p-b-md-15 {
        padding-bottom: 1.5rem !important;
    }

    .p-l-md-15 {
        padding-left: 1.5rem !important;
    }

    .p-md-20 {
        padding: 2rem !important;
    }

    .p-t-md-20 {
        padding-top: 2rem !important;
    }

    .p-r-md-20 {
        padding-right: 2rem !important;
    }

    .p-b-md-20 {
        padding-bottom: 2rem !important;
    }

    .p-l-md-20 {
        padding-left: 2rem !important;
    }

    .p-md-25 {
        padding: 2.5rem !important;
    }

    .p-t-md-25 {
        padding-top: 2.5rem !important;
    }

    .p-r-md-25 {
        padding-right: 2.5rem !important;
    }

    .p-b-md-25 {
        padding-bottom: 2.5rem !important;
    }

    .p-l-md-25 {
        padding-left: 2.5rem !important;
    }

    .p-md-30 {
        padding: 3rem !important;
    }

    .p-t-md-30 {
        padding-top: 3rem !important;
    }

    .p-r-md-30 {
        padding-right: 3rem !important;
    }

    .p-b-md-30 {
        padding-bottom: 3rem !important;
    }

    .p-l-md-30 {
        padding-left: 3rem !important;
    }

    .p-md-35 {
        padding: 3.5rem !important;
    }

    .p-t-md-35 {
        padding-top: 3.5rem !important;
    }

    .p-r-md-35 {
        padding-right: 3.5rem !important;
    }

    .p-b-md-35 {
        padding-bottom: 3.5rem !important;
    }

    .p-l-md-35 {
        padding-left: 3.5rem !important;
    }

    .p-md-40 {
        padding: 4rem !important;
    }

    .p-t-md-40 {
        padding-top: 4rem !important;
    }

    .p-r-md-40 {
        padding-right: 4rem !important;
    }

    .p-b-md-40 {
        padding-bottom: 4rem !important;
    }

    .p-l-md-40 {
        padding-left: 4rem !important;
    }

    .p-md-45 {
        padding: 4.5rem !important;
    }

    .p-t-md-45 {
        padding-top: 4.5rem !important;
    }

    .p-r-md-45 {
        padding-right: 4.5rem !important;
    }

    .p-b-md-45 {
        padding-bottom: 4.5rem !important;
    }

    .p-l-md-45 {
        padding-left: 4.5rem !important;
    }

    .p-md-50 {
        padding: 5rem !important;
    }

    .p-t-md-50 {
        padding-top: 5rem !important;
    }

    .p-r-md-50 {
        padding-right: 5rem !important;
    }

    .p-b-md-50 {
        padding-bottom: 5rem !important;
    }

    .p-l-md-50 {
        padding-left: 5rem !important;
    }

    .p-md-55 {
        padding: 5.5rem !important;
    }

    .p-t-md-55 {
        padding-top: 5.5rem !important;
    }

    .p-r-md-55 {
        padding-right: 5.5rem !important;
    }

    .p-b-md-55 {
        padding-bottom: 5.5rem !important;
    }

    .p-l-md-55 {
        padding-left: 5.5rem !important;
    }

    .p-md-60 {
        padding: 6rem !important;
    }

    .p-t-md-60 {
        padding-top: 6rem !important;
    }

    .p-r-md-60 {
        padding-right: 6rem !important;
    }

    .p-b-md-60 {
        padding-bottom: 6rem !important;
    }

    .p-l-md-60 {
        padding-left: 6rem !important;
    }

    .p-md-65 {
        padding: 6.5rem !important;
    }

    .p-t-md-65 {
        padding-top: 6.5rem !important;
    }

    .p-r-md-65 {
        padding-right: 6.5rem !important;
    }

    .p-b-md-65 {
        padding-bottom: 6.5rem !important;
    }

    .p-l-md-65 {
        padding-left: 6.5rem !important;
    }

    .p-md-70 {
        padding: 7rem !important;
    }

    .p-t-md-70 {
        padding-top: 7rem !important;
    }

    .p-r-md-70 {
        padding-right: 7rem !important;
    }

    .p-b-md-70 {
        padding-bottom: 7rem !important;
    }

    .p-l-md-70 {
        padding-left: 7rem !important;
    }

    .p-md-75 {
        padding: 7.5rem !important;
    }

    .p-t-md-75 {
        padding-top: 7.5rem !important;
    }

    .p-r-md-75 {
        padding-right: 7.5rem !important;
    }

    .p-b-md-75 {
        padding-bottom: 7.5rem !important;
    }

    .p-l-md-75 {
        padding-left: 7.5rem !important;
    }

    .p-md-80 {
        padding: 8rem !important;
    }

    .p-t-md-80 {
        padding-top: 8rem !important;
    }

    .p-r-md-80 {
        padding-right: 8rem !important;
    }

    .p-b-md-80 {
        padding-bottom: 8rem !important;
    }

    .p-l-md-80 {
        padding-left: 8rem !important;
    }

    .p-md-85 {
        padding: 8.5rem !important;
    }

    .p-t-md-85 {
        padding-top: 8.5rem !important;
    }

    .p-r-md-85 {
        padding-right: 8.5rem !important;
    }

    .p-b-md-85 {
        padding-bottom: 8.5rem !important;
    }

    .p-l-md-85 {
        padding-left: 8.5rem !important;
    }

    .p-md-90 {
        padding: 9rem !important;
    }

    .p-t-md-90 {
        padding-top: 9rem !important;
    }

    .p-r-md-90 {
        padding-right: 9rem !important;
    }

    .p-b-md-90 {
        padding-bottom: 9rem !important;
    }

    .p-l-md-90 {
        padding-left: 9rem !important;
    }

    .p-md-95 {
        padding: 9.5rem !important;
    }

    .p-t-md-95 {
        padding-top: 9.5rem !important;
    }

    .p-r-md-95 {
        padding-right: 9.5rem !important;
    }

    .p-b-md-95 {
        padding-bottom: 9.5rem !important;
    }

    .p-l-md-95 {
        padding-left: 9.5rem !important;
    }

    .p-md-100 {
        padding: 10rem !important;
    }

    .p-t-md-100 {
        padding-top: 10rem !important;
    }

    .p-r-md-100 {
        padding-right: 10rem !important;
    }

    .p-b-md-100 {
        padding-bottom: 10rem !important;
    }

    .p-l-md-100 {
        padding-left: 10rem !important;
    }
}

@media (min-width: 1200px) {
    .p-lg-0 {
        padding: 0rem !important;
    }

    .p-t-lg-0 {
        padding-top: 0rem !important;
    }

    .p-r-lg-0 {
        padding-right: 0rem !important;
    }

    .p-b-lg-0 {
        padding-bottom: 0rem !important;
    }

    .p-l-lg-0 {
        padding-left: 0rem !important;
    }

    .p-lg-5 {
        padding: 0.5rem !important;
    }

    .p-t-lg-5 {
        padding-top: 0.5rem !important;
    }

    .p-r-lg-5 {
        padding-right: 0.5rem !important;
    }

    .p-b-lg-5 {
        padding-bottom: 0.5rem !important;
    }

    .p-l-lg-5 {
        padding-left: 0.5rem !important;
    }

    .p-lg-10 {
        padding: 1rem !important;
    }

    .p-t-lg-10 {
        padding-top: 1rem !important;
    }

    .p-r-lg-10 {
        padding-right: 1rem !important;
    }

    .p-b-lg-10 {
        padding-bottom: 1rem !important;
    }

    .p-l-lg-10 {
        padding-left: 1rem !important;
    }

    .p-lg-15 {
        padding: 1.5rem !important;
    }

    .p-t-lg-15 {
        padding-top: 1.5rem !important;
    }

    .p-r-lg-15 {
        padding-right: 1.5rem !important;
    }

    .p-b-lg-15 {
        padding-bottom: 1.5rem !important;
    }

    .p-l-lg-15 {
        padding-left: 1.5rem !important;
    }

    .p-lg-20 {
        padding: 2rem !important;
    }

    .p-t-lg-20 {
        padding-top: 2rem !important;
    }

    .p-r-lg-20 {
        padding-right: 2rem !important;
    }

    .p-b-lg-20 {
        padding-bottom: 2rem !important;
    }

    .p-l-lg-20 {
        padding-left: 2rem !important;
    }

    .p-lg-25 {
        padding: 2.5rem !important;
    }

    .p-t-lg-25 {
        padding-top: 2.5rem !important;
    }

    .p-r-lg-25 {
        padding-right: 2.5rem !important;
    }

    .p-b-lg-25 {
        padding-bottom: 2.5rem !important;
    }

    .p-l-lg-25 {
        padding-left: 2.5rem !important;
    }

    .p-lg-30 {
        padding: 3rem !important;
    }

    .p-t-lg-30 {
        padding-top: 3rem !important;
    }

    .p-r-lg-30 {
        padding-right: 3rem !important;
    }

    .p-b-lg-30 {
        padding-bottom: 3rem !important;
    }

    .p-l-lg-30 {
        padding-left: 3rem !important;
    }

    .p-lg-35 {
        padding: 3.5rem !important;
    }

    .p-t-lg-35 {
        padding-top: 3.5rem !important;
    }

    .p-r-lg-35 {
        padding-right: 3.5rem !important;
    }

    .p-b-lg-35 {
        padding-bottom: 3.5rem !important;
    }

    .p-l-lg-35 {
        padding-left: 3.5rem !important;
    }

    .p-lg-40 {
        padding: 4rem !important;
    }

    .p-t-lg-40 {
        padding-top: 4rem !important;
    }

    .p-r-lg-40 {
        padding-right: 4rem !important;
    }

    .p-b-lg-40 {
        padding-bottom: 4rem !important;
    }

    .p-l-lg-40 {
        padding-left: 4rem !important;
    }

    .p-lg-45 {
        padding: 4.5rem !important;
    }

    .p-t-lg-45 {
        padding-top: 4.5rem !important;
    }

    .p-r-lg-45 {
        padding-right: 4.5rem !important;
    }

    .p-b-lg-45 {
        padding-bottom: 4.5rem !important;
    }

    .p-l-lg-45 {
        padding-left: 4.5rem !important;
    }

    .p-lg-50 {
        padding: 5rem !important;
    }

    .p-t-lg-50 {
        padding-top: 5rem !important;
    }

    .p-r-lg-50 {
        padding-right: 5rem !important;
    }

    .p-b-lg-50 {
        padding-bottom: 5rem !important;
    }

    .p-l-lg-50 {
        padding-left: 5rem !important;
    }

    .p-lg-55 {
        padding: 5.5rem !important;
    }

    .p-t-lg-55 {
        padding-top: 5.5rem !important;
    }

    .p-r-lg-55 {
        padding-right: 5.5rem !important;
    }

    .p-b-lg-55 {
        padding-bottom: 5.5rem !important;
    }

    .p-l-lg-55 {
        padding-left: 5.5rem !important;
    }

    .p-lg-60 {
        padding: 6rem !important;
    }

    .p-t-lg-60 {
        padding-top: 6rem !important;
    }

    .p-r-lg-60 {
        padding-right: 6rem !important;
    }

    .p-b-lg-60 {
        padding-bottom: 6rem !important;
    }

    .p-l-lg-60 {
        padding-left: 6rem !important;
    }

    .p-lg-65 {
        padding: 6.5rem !important;
    }

    .p-t-lg-65 {
        padding-top: 6.5rem !important;
    }

    .p-r-lg-65 {
        padding-right: 6.5rem !important;
    }

    .p-b-lg-65 {
        padding-bottom: 6.5rem !important;
    }

    .p-l-lg-65 {
        padding-left: 6.5rem !important;
    }

    .p-lg-70 {
        padding: 7rem !important;
    }

    .p-t-lg-70 {
        padding-top: 7rem !important;
    }

    .p-r-lg-70 {
        padding-right: 7rem !important;
    }

    .p-b-lg-70 {
        padding-bottom: 7rem !important;
    }

    .p-l-lg-70 {
        padding-left: 7rem !important;
    }

    .p-lg-75 {
        padding: 7.5rem !important;
    }

    .p-t-lg-75 {
        padding-top: 7.5rem !important;
    }

    .p-r-lg-75 {
        padding-right: 7.5rem !important;
    }

    .p-b-lg-75 {
        padding-bottom: 7.5rem !important;
    }

    .p-l-lg-75 {
        padding-left: 7.5rem !important;
    }

    .p-lg-80 {
        padding: 8rem !important;
    }

    .p-t-lg-80 {
        padding-top: 8rem !important;
    }

    .p-r-lg-80 {
        padding-right: 8rem !important;
    }

    .p-b-lg-80 {
        padding-bottom: 8rem !important;
    }

    .p-l-lg-80 {
        padding-left: 8rem !important;
    }

    .p-lg-85 {
        padding: 8.5rem !important;
    }

    .p-t-lg-85 {
        padding-top: 8.5rem !important;
    }

    .p-r-lg-85 {
        padding-right: 8.5rem !important;
    }

    .p-b-lg-85 {
        padding-bottom: 8.5rem !important;
    }

    .p-l-lg-85 {
        padding-left: 8.5rem !important;
    }

    .p-lg-90 {
        padding: 9rem !important;
    }

    .p-t-lg-90 {
        padding-top: 9rem !important;
    }

    .p-r-lg-90 {
        padding-right: 9rem !important;
    }

    .p-b-lg-90 {
        padding-bottom: 9rem !important;
    }

    .p-l-lg-90 {
        padding-left: 9rem !important;
    }

    .p-lg-95 {
        padding: 9.5rem !important;
    }

    .p-t-lg-95 {
        padding-top: 9.5rem !important;
    }

    .p-r-lg-95 {
        padding-right: 9.5rem !important;
    }

    .p-b-lg-95 {
        padding-bottom: 9.5rem !important;
    }

    .p-l-lg-95 {
        padding-left: 9.5rem !important;
    }

    .p-lg-100 {
        padding: 10rem !important;
    }

    .p-t-lg-100 {
        padding-top: 10rem !important;
    }

    .p-r-lg-100 {
        padding-right: 10rem !important;
    }

    .p-b-lg-100 {
        padding-bottom: 10rem !important;
    }

    .p-l-lg-100 {
        padding-left: 10rem !important;
    }
}

.ml-auto {
    margin-left: auto !important;
}

.mr-0 {
    margin-right: 0 !important;
}

/*--Base css--*/
html {
    font-size: 10px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

body {
    position: relative;
    font-family: var(--primary-font);
    font-size: 1.6rem;
    line-height: 1.7;
    margin: 0;
    padding: 0;
    color: var(--grey-dark-two);
}

::-moz-selection {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-shadow: none;
}

::selection {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-shadow: none;
}

hr {
    display: block;
    height: 0.2rem;
    border: 0;
    margin: 0;
    padding: 0;
    background: var(--grey-light-three);
}

audio,
canvas,
iframe,
img,
svg,
video {
    vertical-align: middle;
}

video,
audio {
    max-width: 100%;
    width: 100%;
    margin-bottom: 2rem;
}

fieldset {
    border: 0;
    margin: 0;
    padding: 0;
}

textarea {
    resize: vertical;
}

p {
    margin-bottom: 3rem;
}

img {
    max-width: 100%;
    height: auto !important;
    /* Nikola Edit */
}

ul,
ol {
    font-family: var(--secondary-font);
    font-size: 1.8rem;
    line-height: 3rem;
    padding-left: 3rem;
    margin-bottom: 0;
}

@media (max-width: 991px) {

    ul,
    ol {
        font-size: 16px;
    }
}

a,
button {
    outline: none;
    transition: all 0.5s;
}

.btn-link,
.txt-btn {
    text-decoration: none;
}

a {
    color: inherit;
    text-decoration: none;
}

h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
    color: inherit;
}

a:hover {
    color: var(--primary-color);
    text-decoration: none;
}

.container {
    position: relative;
}

@media (min-width: 1599px) {
    .container {
        max-width: 1260px;
    }
}

.container-fluid {
    position: relative;
}

figure {
    margin: 0;
    padding: 0;
}

@media (max-width: 991px) {
    figure img {
        width: 100%;
        height: auto;
    }
}

.img-container {
    display: block;
}

.list-inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.rotate-txt a {
    position: relative;
    display: inline-flex;
    transition: transform 0.3s;
    overflow: hidden;
    color: transparent;
}

.rotate-txt a::before,
.rotate-txt a::after {
    content: attr(data-txt);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--grey-dark-one);
    font-family: var(--primary-font);
    font-size: inherit;
    line-height: inherit;
    font-weight: var(--p-mid);
    transition: all 0.3s ease-in-out;
}

@media (max-width: 991px) {

    .rotate-txt a::before,
    .rotate-txt a::after {
        display: none;
    }
}

.rotate-txt a::after {
    top: auto;
    bottom: -2.5rem;
}

@media screen and (min-width: 992px) {
    .rotate-txt li:hover>a::before {
        top: -3rem;
    }

    .rotate-txt li:hover>a::after {
        bottom: 0;
    }
}

.title-wrapper {
    display: flex;
    flex-wrap: wrap;
}

.section-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.section-title .axil-title {
    margin-bottom: 0;
}

.section-title__bordered {
    border-bottom: 0.2rem solid var(--grey-light-one);
    padding-bottom: 1rem;
}

.title-white * {
    color: #fff !important;
}

/* -- Print Media query
---------------------------------------- -- */
@media print,
(-webkit-min-device-pixel-ratio: 1.25),
(min-resolution: 1.25dppx),
(min-resolution: 120dpi) {
    /* Style adjustments for high resolution devices */
}

/* -- Print styles- Inlined to avoid the additional HTTP request:
----------------------------------------------------------------------------- */
@media print {

    *,
    *:before,
    *:after {
        background: transparent !important;
        /* Black prints faster */
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
    }

    a,
    a:visited {
        text-decoration: underline;
    }

    a[href]:after {
        content: " ("attr(href) ")";
    }

    abbr[title]:after {
        content: " ("attr(title) ")";
    }

    /* -- Don't show links that are fragment identifiers -- */
    a[href^="#"]:after,
    a[href^="javascript:"]:after {
        content: "";
    }

    pre {
        white-space: pre-wrap !important;
    }

    pre,
    blockquote {
        page-break-inside: avoid;
    }

    /* -- Printing Tables -- */
    thead {
        display: table-header-group;
    }

    tr,
    img {
        page-break-inside: avoid;
    }

    p,
    h2,
    h3 {
        orphans: 3;
        widows: 3;
    }

    h2,
    h3 {
        page-break-after: avoid;
    }
}

@media only screen and (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

.container,
.container-fluid {
    padding-left: 15px;
    padding-right: 15px;
}

.row {
    margin-right: -15px;
    margin-left: -15px;
}

.row>[class*="col"] {
    padding-left: 15px;
    padding-right: 15px;
}

.g-0,
.no-gutters {
    margin-left: 0px;
    margin-right: 0px;
}

.g-0>[class*="col"],
.no-gutters>[class*="col"] {
    padding-left: 0px;
    padding-right: 0px;
}

/*--Helper clasess--*/
.media {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
}

.media .media-body {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.text-right {
    text-align: right !important;
}

.text-left {
    text-align: left !important;
}

.text-center {
    text-align: center !important;
}

.section-gap {
    padding-top: 6rem;
    padding-bottom: 3rem;
}

.section-gap-top {
    padding-top: 6rem;
}

.section-gap-bottom {
    padding-bottom: 3rem;
}

.section-gap-top__with-text {
    padding-top: 4.6rem;
}

.object-fit__cover {
    object-fit: cover;
}

.object-fit__contain {
    object-fit: contain;
}

.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}

.visuallyhidden.focusable:active,
.visuallyhidden.focusable:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
    white-space: inherit;
}

.invisible {
    visibility: hidden;
}

.border-radius {
    border-radius: var(--radius);
}

.no-overflow {
    overflow: hidden;
}

.bottom-border {
    border-bottom: 2px solid var(--bg-light);
}

.overlay-over {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.overlay {
    background-color: rgba(18, 18, 19, 0.6);
}

.grad-overlay {
    background: linear-gradient(180deg, rgba(18, 18, 19, 0) 0%, #121213 100%);
}

.grad-overlay__transparent {
    background: linear-gradient(180deg, rgba(18, 18, 19, 0) 0%, rgba(18, 18, 19, 0.7) 100%);
}

.y-scroll-container {
    height: calc(100vh - 16rem);
    overflow-x: hidden;
}

@media (max-width: 991px) {
    .y-scroll-container {
        height: auto;
        overflow-x: initial;
    }
}

.negative-gap {
    margin-top: -1.4rem;
}

.custom-fluid-container {
    position: relative;
    padding: 0 8rem;
}

.custom-fluid-container .row {
    margin: 0 -4rem;
}

.custom-fluid-container .row [class*="col-"] {
    padding: 0 4rem;
}

@media (max-width: 1199px) {
    .custom-fluid-container {
        padding: 0 4rem;
    }

    .custom-fluid-container .row {
        margin-left: -4rem;
        margin-right: -4rem;
    }

    .custom-fluid-container .row [class*="col-"] {
        padding-left: 4rem;
        padding-right: 4rem;
    }
}

@media (max-width: 991px) {
    .custom-fluid-container {
        padding: 0 1.5rem;
    }

    .custom-fluid-container .row {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
    }

    .custom-fluid-container .row [class*="col-"] {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}

.primary-font {
    font-family: var(--primary-font);
}

.secondary-font {
    font-family: var(--secondary-font);
}

.primary-color {
    color: var(--primary-color);
}

.secondary-color {
    color: var(--secondary-color);
}

.tertiary-color {
    color: var(--tertiary-color);
}

.grey-dark-key {
    color: var(--grey-dark-key);
}

.grey-dark-one {
    color: var(--grey-dark-one);
}

.grey-dark-two {
    color: var(--grey-dark-two);
}

.grey-dark-three {
    color: var(--grey-dark-three);
}

.grey-dark-four {
    color: var(--grey-dark-four);
}

.grey-dark-five {
    color: var(--grey-dark-five);
}

.grey-dark-six {
    color: var(--grey-dark-six);
}

.grey-dark-seven {
    color: var(--grey-dark-seven);
}

.grey-dark-eight {
    color: var(--grey-dark-eight);
}

.grey-mid {
    color: var(--grey-mid);
}

.grey-light-one {
    color: var(--grey-light-one);
}

.grey-light-two {
    color: var(--grey-light-two);
}

.grey-light-three {
    color: var(--grey-light-three);
}

.border-color {
    color: var(--border-color);
}

.color-success {
    color: var(--color-success);
}

.color-danger {
    color: var(--color-danger);
}

.color-warning {
    color: var(--color-warning);
}

.color-info {
    color: var(--color-info);
}

.color-facebook {
    color: var(--color-facebook);
}

.color-twitter {
    color: var(--color-twitter);
}

.color-instagram {
    color: var(--color-instagram);
}

.color-youtube {
    color: var(--color-youtube);
}

.color-linkedin {
    color: var(--color-linkedin);
}

.color-pinterest {
    color: var(--color-pinterest);
}

.color-vimeo {
    color: var(--color-vimeo);
}

.color-twitch {
    color: var(--color-twitch);
}

.color-green-one {
    color: var(--color-green-one);
}

.color-green-two {
    color: var(--color-green-two);
}

.color-green-three {
    color: var(--color-green-three);
}

.color-blue-one {
    color: var(--color-blue-one);
}

.color-blue-two {
    color: var(--color-blue-two);
}

.color-blue-three {
    color: var(--color-blue-three);
}

.color-blue-four {
    color: var(--color-blue-four);
}

.color-red-one {
    color: var(--color-red-one);
}

.color-red-two {
    color: var(--color-red-two);
}

.color-purple-one {
    color: var(--color-purple-one);
}

.color-purple-two {
    color: var(--color-purple-two);
}

.color-yellow-one {
    color: var(--color-yellow-one);
}

.color-yellow-two {
    color: var(--color-yellow-two);
}

.color-blue-grey-one {
    color: var(--color-blue-grey-one);
}

.color-white {
    color: var(--color-white);
}

.bg-primary-color {
    background-color: var(--primary-color);
}

.bg-secondary-color {
    background-color: var(--secondary-color);
}

.bg-tertiary-color {
    background-color: var(--tertiary-color);
}

.bg-grey-dark-key {
    background-color: var(--grey-dark-key);
}

.bg-grey-dark-one {
    background-color: var(--grey-dark-one);
}

.bg-grey-dark-two {
    background-color: var(--grey-dark-two);
}

.bg-grey-dark-three {
    background-color: var(--grey-dark-three);
}

.bg-grey-dark-four {
    background-color: var(--grey-dark-four);
}

.bg-grey-dark-five {
    background-color: var(--grey-dark-five);
}

.bg-grey-dark-six {
    background-color: var(--grey-dark-six);
}

.bg-grey-dark-seven {
    background-color: var(--grey-dark-seven);
}

.bg-grey-dark-eight {
    background-color: var(--grey-dark-eight);
}

.bg-grey-mid {
    background-color: var(--grey-mid);
}

.bg-grey-light-one {
    background-color: var(--grey-light-one);
}

.bg-grey-light-two {
    background-color: var(--grey-light-two);
}

.bg-grey-light-three {
    background-color: var(--grey-light-three);
}

.border-bg-color {
    background-color: var(--border-color);
}

.bg-color-success {
    background-color: var(--color-success);
}

.bg-color-danger {
    background-color: var(--color-danger);
}

.bg-color-warning {
    background-color: var(--color-warning);
}

.bg-color-info {
    background-color: var(--color-info);
}

.bg-color-facebook {
    background-color: var(--color-facebook);
}

.bg-color-twitter {
    background-color: var(--color-twitter);
}

.bg-color-instagram {
    background-color: var(--color-instagram);
}

.bg-color-youtube {
    background-color: var(--color-youtube);
}

.bg-color-linkedin {
    background-color: var(--color-linkedin);
}

.bg-color-pinterest {
    background-color: var(--color-pinterest);
}

.bg-color-vimeo {
    background-color: var(--color-vimeo);
}

.bg-color-twitch {
    background-color: var(--color-twitch);
}

.bg-color-green-one {
    background-color: var(--color-green-one);
}

.bg-color-green-two {
    background-color: var(--color-green-two);
}

.bg-color-green-three {
    background-color: var(--color-green-three);
}

.bg-color-blue-one {
    background-color: var(--color-blue-one);
}

.bg-color-blue-two {
    background-color: var(--color-blue-two);
}

.bg-color-blue-three {
    background-color: var(--color-blue-three);
}

.bg-color-blue-four {
    background-color: var(--color-blue-four);
}

.bg-color-red-one {
    background-color: var(--color-red-one);
}

.bg-color-red-two {
    background-color: var(--color-red-two);
}

.bg-color-purple-one {
    background-color: var(--color-purple-one);
}

.bg-color-purple-two {
    background-color: var(--color-purple-two);
}

.bg-color-yellow-one {
    background-color: var(--color-yellow-one);
}

.bg-color-yellow-two {
    background-color: var(--color-yellow-two);
}

.bg-color-blue-grey-one {
    background-color: var(--color-blue-grey-one);
}

.bg-color-white {
    background-color: var(--color-white);
}

.p-light {
    font-weight: var(--p-light);
}

.p-regular {
    font-weight: var(--p-regular);
}

.p-medium {
    font-weight: var(--p-medium);
}

.p-semibold {
    font-weight: var(--p-semibold);
}

.p-bold {
    font-weight: var(--p-bold);
}

.p-extra-bold {
    font-weight: var(--p-extra-bold);
}

.p-black {
    font-weight: var(--p-black);
}

.s-light {
    font-weight: var(--s-light);
}

.s-regular {
    font-weight: var(--s-regular);
}

.s-medium {
    font-weight: var(--s-medium);
}

.s-bold {
    font-weight: var(--s-bold);
}

.s-black {
    font-weight: var(--s-black);
}

.radius {
    border-radius: var(--radius);
}

.radius-big {
    border-radius: var(--radius-big);
}

.radius-small {
    border-radius: var(--radius-small);
}

.shadow-light {
    box-shadow: var(--shadow-light);
}

.shadow-dark {
    box-shadow: var(--shadow-dark);
}

.txt-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.grad-bg {
    background: linear-gradient(135deg, #EBEAF4 0%, #B5C0E1 100%, #B5C0E1 100%);
}

/*--Typography--*/
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
    font-family: var(--primary-font);
    color: var(--grey-dark-one);
    font-weight: var(--p-semi-bold);
    line-height: 1.4;
    margin-bottom: 2rem;
}

h1,
.h1 {
    font-size: 4.2rem;
}

@media (max-width: 991px) {

    h1,
    .h1 {
        font-size: 3.2rem;
    }
}

.page-title {
    font-size: 4.2rem;
}

@media (max-width: 991px) {
    .page-title {
        font-size: 2.4rem;
        line-height: 3.6rem;
    }
}

h2,
.h2 {
    font-size: 3.6rem;
}

@media (max-width: 991px) {

    h2,
    .h2 {
        font-size: 2.2rem;
    }
}

h3,
.h3 {
    font-size: 3rem;
}

@media (max-width: 991px) {

    h3,
    .h3 {
        font-size: 2rem;
    }
}

h4,
.h4 {
    font-size: 2.4rem;
}

@media (max-width: 991px) {

    h4,
    .h4 {
        font-size: 1.8rem;
    }
}

h5,
.h5 {
    font-size: 1.8rem;
    line-height: 1.6;
}

@media (max-width: 991px) {

    h5,
    .h5 {
        font-size: 1.6rem;
    }
}

h6,
.h6 {
    font-size: 1.4rem;
    line-height: 1.6;
}

p {
    font-family: var(--secondary-font);
    font-size: 1.8rem;
    line-height: 3rem;
    color: var(--grey-dark-two);
}

p.big {
    font-size: 2rem;
}

p.mid {
    font-size: 1.6rem;
    line-height: 2.8rem;
}

p.small {
    font-size: 1.4rem;
    line-height: 2.4rem;
}

@media (max-width: 991px) {
    p {
        font-size: 16px;
    }

    p.big {
        font-size: 1.8rem;
    }

    p.mid {
        font-size: 1.4rem;
        line-height: 2.4rem;
    }

    p.small {
        font-size: 1.2rem;
    }
}

.axil-title {
    font-size: 3.2rem;
    line-height: 4.2rem;
}

@media (max-width: 991px) {
    .axil-title {
        font-size: 2rem;
        line-height: 3rem;
    }
}

.axil-title__big {
    font-size: 3.6rem;
    line-height: 5rem;
}

@media (max-width: 991px) {
    .axil-title__big {
        font-size: 2rem;
        line-height: 3rem;
    }
}

.axil-title__mid {
    font-size: 2.4rem;
    line-height: 3.6rem;
}

.axil-title__small {
    font-size: 1.8rem;
    line-height: 3rem;
}

address,
.address {
    font-family: var(--secondary-font);
    font-size: 2rem;
    line-height: 3.4rem;
    color: var(--color-dark-one);
}

@media (max-width: 991px) {

    address,
    .address {
        font-size: 1.6rem;
        line-height: 2.4rem;
    }
}

/*--Backgrounds--*/
.banner {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.banner__single-hero {
    background-image: url(../../public/images/others/banner-gallery-4.jpg);
}

.under-construction-banner {
    background-size: 40% 100%;
    background-repeat: no-repeat;
    background-position: right center;
}

@media (max-width: 1199px) {
    .under-construction-banner {
        background-size: 50% 100%;
    }
}

@media (max-width: 1199px) {
    .under-construction-banner {
        background-size: cover;
    }
}

/*--Animations--*/
@keyframes menu-toggler-anim {
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
}

@keyframes float {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(100px);
    }

    100% {
        transform: translateY(0);
    }
}

/*--Buttons--*/
.btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--secondary-font);
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: var(--p-bold);
    letter-spacing: 0.1rem;
    color: #FFFFFF;
    padding: 1.4rem 4rem 1.3rem;
    border-width: 0.2rem;
    border-style: solid;
    border-radius: 0;
    z-index: 1;
}

.btn::before {
    content: " ";
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;
    transition: all 0.5s;
}

.btn.btn-primary {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

.btn.btn-primary.btn-nofill {
    color: var(--primary-color);
}

.btn.btn-primary:focus,
.btn.btn-primary:active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    box-shadow: none;
    color: #fff;
}

.btn.btn-secondary {
    background: var(--grey-mid);
    border-color: var(--grey-mid);
}

.btn.btn-secondary.btn-nofill {
    color: var(--grey-dark-four);
}

.btn.btn-nofill {
    background: transparent;
    transition: all 0.5s;
}

.btn.btn-nofill:hover {
    background: var(--primary-color);
    color: #fff;
}

.btn.btn-small {
    font-size: 1.2rem;
    line-height: 1.6rem;
    padding: 1.1rem 3rem;
}

.btn:hover {
    color: #fff;
}

.btn:hover::before {
    width: 100%;
    right: auto;
    left: 0;
}

.btn-link,
.txt-btn {
    position: relative;
    font-family: var(--primary-font);
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-semi-bold);
    text-transform: uppercase;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
}

.btn-link::before,
.btn-link::after {
    content: " ";
    width: 100%;
    height: 0.2rem;
    background-color: currentColor;
    position: absolute;
    left: 100%;
    bottom: 0;
    transition: all 0.5s;
    transform: translateX(-100%);
}

.btn-link::after {
    left: -100%;
}

.btn-link:hover {
    text-decoration: none;
    color: currentColor;
}

.btn-link:hover::before,
.btn-link:hover::after {
    transform: translateX(100%);
}

.btn-link__primary {
    color: var(--primary-color);
}

.btn-link__primary::before,
.btn-link__primary::after {
    background-color: var(--primary-color);
}

@media (max-width: 991px) {
    .btn-link__primary {
        font-size: 1.2rem;
        line-height: 2rem;
    }
}

.cat-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--secondary-font);
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: var(--p-bold);
    letter-spacing: 0.1rem;
    color: #FFFFFF;
    padding: 1.4rem 4rem 1.3rem;
    border-width: 0.2rem;
    border-style: solid;
    border-radius: 0;
    padding: 0.6rem 1.1rem 0.4rem;
    border: none;
    font-size: 1.1rem;
    line-height: 1.4rem;
    font-weight: var(--s-bold);
    z-index: 1;
    text-transform: uppercase;
}

.cat-btn::before {
    content: " ";
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;
    transition: all 0.5s;
}

.cat-btn.btn-primary {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

.cat-btn.btn-primary.btn-nofill {
    color: var(--primary-color);
}

.cat-btn.btn-primary:focus,
.cat-btn.btn-primary:active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    box-shadow: none;
    color: #fff;
}

.cat-btn.btn-secondary {
    background: var(--grey-mid);
    border-color: var(--grey-mid);
}

.cat-btn.btn-secondary.btn-nofill {
    color: var(--grey-dark-four);
}

.cat-btn.btn-nofill {
    background: transparent;
    transition: all 0.5s;
}

.cat-btn.btn-nofill:hover {
    background: var(--primary-color);
    color: #fff;
}

.cat-btn.btn-small {
    font-size: 1.2rem;
    line-height: 1.6rem;
    padding: 1.1rem 3rem;
}

.cat-btn:hover {
    color: #fff;
}

.cat-btn:hover::before {
    width: 100%;
    right: auto;
    left: 0;
}

.txt-btn {
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: var(--primary-color);
    border: none;
}

.btn-group {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
}

.btn-group a,
.btn-group button {
    margin: 0 1rem 1rem 0;
}

.video-play-btn,
.post-format {
    width: 7rem;
    height: 7rem;
    background: #fff;
    border-radius: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    cursor: pointer;
}

.video-play-btn:hover,
.post-format:hover {
    box-shadow: 0 0 10rem rgba(0, 0, 0, 0.7);
}

.video-play-btn::after,
.post-format::after {
    content: " ";
    width: 0;
    height: 0;
    border-top: 0.9rem solid transparent;
    border-left: 1.4rem solid var(--grey-dark-one);
    border-bottom: 0.9rem solid transparent;
    margin-left: 0.4rem;
}

.video-play-btn__big,
.post-format__big {
    width: 10rem;
    height: 10rem;
}

.video-play-btn__big::after,
.post-format__big::after {
    border-top: 1.25rem solid transparent;
    border-left: 2rem solid var(--grey-dark-one);
    border-bottom: 1.25rem solid transparent;
}

@media (max-width: 991px) {

    .video-play-btn__big,
    .post-format__big {
        width: 7rem;
        height: 7rem;
    }

    .video-play-btn__big::after,
    .post-format__big::after {
        border-top: 0.9rem solid transparent;
        border-left: 1.4rem solid var(--grey-dark-one);
        border-bottom: 0.9rem solid transparent;
    }
}

.video-play-btn__small,
.post-format__small {
    width: 3.5rem;
    height: 3.5rem;
}

.video-play-btn__small::after,
.post-format__small::after {
    border-top: 0.45rem solid transparent;
    border-left: 0.7rem solid var(--grey-dark-one);
    border-bottom: 0.45rem solid transparent;
}

@media (max-width: 991px) {

    .video-play-btn__small,
    .post-format__small {
        width: 3.5rem;
        height: 3.5rem;
    }

    .video-play-btn__small::after,
    .post-format__small::after {
        border-top: 0.45rem solid transparent;
        border-left: 0.7rem solid var(--grey-dark-one);
        border-bottom: 0.45rem solid transparent;
    }
}

.video-play-btn {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex !important;
    z-index: 9;
}

div.video-play-btn,
span.video-play-btn {
    pointer-events: none;
}

.post-format::after {
    display: none;
}

.post-format:hover {
    box-shadow: none;
}

.post-format i {
    color: var(--grey-dark-one);
    margin-left: 0.3rem;
}

.btn-primary:not(:disabled):not(.disabled).active:focus,
.btn-primary:not(:disabled):not(.disabled):active:focus,
.show>.btn-primary.dropdown-toggle:focus,
.btn-primary:not(:disabled):not(.disabled).active,
.btn-primary:not(:disabled):not(.disabled):active,
.show>.btn-primary.dropdown-toggle {
    background: var(--primary-color);
    box-shadow: none;
    color: #fff;
    border-color: var(--primary-color);
}

/*--Language dropdown--*/
.lang-dropdown .txt-btn {
    font-size: 1.6rem;
    line-height: 2.5rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-semi-bold);
    padding: 0.8rem 1rem 0.9rem;
}

.lang-dropdown .txt-btn:hover {
    color: var(--primary-color);
}

.lang-dropdown .dropdown-toggle::before {
    display: none;
}

.lang-dropdown .dropdown-toggle::after {
    font-family: var(--font-awesome);
    content: "\f107";
    font-size: inherit;
    line-height: 2rem;
    border: none;
    margin-left: 0.8rem;
}

.lang-dropdown .dropdown-toggle:focus {
    outline: 0;
    box-shadow: none;
}

.lang-dropdown .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 15rem;
    background: var(--grey-dark-one);
    padding: 2rem 0;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: all 0.3s var(--cubic-easing);
    transform-origin: top left;
    z-index: 99;
    top: 4rem;
    display: block !important;
    background: var(--grey-light-three);
    box-shadow: var(--shadow-dark);
    border: none;
}

.lang-dropdown .dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
}

.lang-dropdown .dropdown-menu .dropdown-item {
    font-size: 1.6rem;
    line-height: 2.5rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-semi-bold);
}

.lang-dropdown .dropdown-menu .dropdown-item:hover {
    background: transparent;
    color: var(--primary-color);
}

/*--Forms--*/
::placeholder {
    color: var(--grey-dark-four);
    opacity: 1;
}

:-ms-input-placeholder {
    color: var(--grey-dark-four);
}

::-ms-input-placeholder {
    color: var(--grey-dark-four);
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"],
input[type="file"],
textarea,
select {
    display: block;
    width: 100%;
    height: auto;
    border: none;
    background: transparent;
    font-family: var(--secondary-font);
    font-size: 1.6rem;
    line-height: 3rem;
    color: var(--grey-dark-one);
    padding: 0.9rem 2rem;
    border-radius: 0;
    border: 0.2rem solid var(--grey-light-one);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: all 0.5s;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
input[type="file"]:focus,
textarea:focus,
select:focus {
    outline: none;
    box-shadow: none;
}

textarea {
    resize: vertical;
}

label {
    position: relative;
    top: 0;
    left: 0;
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--grey-dark-four);
    padding: 0 1rem;
    margin-bottom: 0;
    transition: all 0.2s;
}

label span {
    color: var(--primary-color);
    margin-left: 1.5rem;
}

select {
    cursor: pointer;
    color: var(--typo-body);
}

.form-group {
    position: relative;
    margin-bottom: 3rem;
}

.form-group.focused input[type="text"]+label,
.form-group.focused input[type="password"]+label,
.form-group.focused input[type="email"]+label,
.form-group.focused input[type="number"]+label,
.form-group.focused input[type="file"]+label,
.form-group.focused textarea+label,
.form-group.focused select+label {
    top: 2.7rem;
    left: 1rem;
    background: #fff;
    padding: 0 1rem;
}

.form-group.focused select {
    color: var(--typo-dark);
}

.select-wrapper {
    position: relative;
}

.select-wrapper::before {
    content: "\f0d7";
    position: absolute;
    right: 15px;
    bottom: 0;
    font-family: "Font Awesome 5 Pro";
    font-size: 1.6rem;
    line-height: 4rem;
    font-weight: 600;
    z-index: 9;
    transition: all 0.5s;
}

.select-wrapper.focused::before {
    color: var(--primary-color);
}

input[type="checkbox"],
input[type="radio"] {
    opacity: 0;
    position: absolute;
}

input[type="checkbox"]+label,
input[type="radio"]+label {
    position: relative;
    font-family: var(--secondary-font);
    font-size: 1.4rem;
    line-height: 2.4rem;
    font-weight: var(--s-regular);
    color: var(--grey-dark-three);
    padding-left: 1.5rem;
    cursor: pointer;
}

input[type="checkbox"]+label::before,
input[type="radio"]+label::before {
    content: " ";
    position: absolute;
    top: 0.5rem;
    left: 0;
    width: 1.2rem;
    height: 1.2rem;
    background-color: #fff;
    border: 0.2rem solid var(--grey-light-one);
    transition: all 0.3s;
}

input[type="checkbox"]+label::after,
input[type="radio"]+label::after {
    content: " ";
    position: absolute;
    top: 0.8rem;
    left: 3rem;
    width: 0.8rem;
    height: 0.5rem;
    background-color: transparent;
    border-bottom: 0.2rem solid #fff;
    border-left: 0.2rem solid #fff;
    transform: rotate(-45deg);
    opacity: 0;
    border-radius: 0;
    transition: all 0.3s;
}

input[type="checkbox"]:checked+label::before,
input[type="radio"]:checked+label::before {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

input[type="checkbox"]:checked+label::after,
input[type="radio"]:checked+label::after {
    opacity: 1;
}

input[type="checkbox"]+label::before {
    width: 1.2rem;
    height: 1.2rem;
    top: 0.5rem;
}

input[type="checkbox"]+label::after {
    top: 0.7rem;
    left: 0.2rem;
}

input[type="checkbox"]:checked+label::before {
    border-color: var(--primary-color);
}

input[type="radio"] {
    width: auto;
}

input[type="radio"]+label::before {
    border-radius: 50%;
}

input[type="radio"]+label::after {
    width: 0.6rem;
    height: 0.6rem;
    left: 0.5rem;
    top: 1.2rem;
    background: #fff;
    border-radius: 50%;
}

.input-border {
    width: calc(100% + 0.4rem);
    transform: scale3d(1, -1, 1);
    transition: stroke-dashoffset 0.3s;
    pointer-events: none;
    stroke: var(--grey-light-one);
    stroke-width: 5px;
    stroke-dasharray: 962;
    stroke-dashoffset: 558;
    position: absolute;
    top: 0;
    left: -0.2rem;
    fill: none;
    overflow: hidden;
}

@media (max-width: 767px) {
    .input-border {
        width: 100%;
        left: 0;
    }
}

.input-txt {
    position: absolute;
    left: 0;
    bottom: 1rem;
    display: block;
    font-family: var(--secondary-font);
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: var(--grey-dark-three);
    font-weight: var(--s-regular);
    padding: 0 2rem;
    transform-origin: 0% 50%;
    pointer-events: none;
    transition: transform 0.3s;
}

.input-txt span {
    font-size: 1.4rem;
    color: var(--primary-color);
    margin-left: 0.7rem;
}

.form-group label {
    position: absolute;
    top: 1.4rem;
    left: 1.2rem;
    pointer-events: none;
    z-index: 9;
    background: #fff;
}

.form-group.focused input,
.form-group.focused textarea {
    border-color: var(--primary-color);
}

.form-group.focused label {
    top: -1rem;
    font-size: 1.2rem;
    color: var(--primary-color);
}

.bg-grey-light-three .form-group label {
    background: var(--grey-light-three);
}

.axil-contact-form-block .form-group label {
    background: var(--color-white);
}

.subscription-form .input-border {
    width: 100%;
    left: 0;
}

.comment-form .input-border {
    width: 100%;
    left: 0;
}

.comment-form .comment-message-field .input-border {
    width: calc(100% + 2px);
    stroke-width: 0.3rem;
    left: -1px;
}

.error-msg p,
.success-msg p {
    font-size: 1.3rem;
    line-height: 1;
    color: var(--color-danger);
    font-weight: var(--p-semi-bold);
    margin: 1rem 0 0;
}

.success-msg p {
    color: var(--color-success);
}

.form-group.has-error input,
.form-group.has-error textarea {
    border-color: var(--color-danger);
}

.form-group-small input {
    line-height: 2rem;
}

.form-group-small label {
    top: 0.9rem;
}

/*--Social share--*/
.social-share {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
}

.social-share li {
    margin-right: 1rem;
}

.social-share li a {
    font-size: 2rem;
    color: var(--grey-dark-one);
}

.social-share li a:hover {
    color: var(--primary-color);
}

.social-share__with-bg li a {
    display: block;
    width: 3.2rem;
    height: 3.2rem;
    background: var(--grey-dark-one);
    border-radius: 100%;
    font-size: 1.2rem;
    line-height: 3.2rem;
    color: #fff;
    text-align: center;
}

.social-share__with-bg li a:hover {
    background: var(--primary-color);
    color: #fff;
    transform: rotate(45deg);
}

.social-share__with-bg-white li a {
    background: #fff;
    color: var(--grey-dark-one);
}

.social-share__vertical {
    flex-direction: column;
}

.social-share__vertical li {
    margin: 0 0 2rem;
}

.social-share__square li {
    margin: 0;
}

.social-share__square li a {
    width: 8rem;
    height: 6rem;
    line-height: 6rem;
    border-radius: 0;
}

@media (max-width: 991px) {
    .social-share__square li a {
        width: 6rem;
    }
}

.social-share__square li a:hover {
    transform: none;
}

.post-details__social-share {
    position: absolute;
    top: 0;
    left: -6.4rem;
}

@media (max-width: 1199px) {
    .post-details__social-share {
        position: static;
    }

    .post-details__social-share .social-share__vertical {
        flex-direction: row;
        margin-bottom: 2rem;
    }

    .post-details__social-share .social-share__vertical li {
        margin: 0 1rem 1rem 0;
    }
}

.contact-social-share .social-share-list-wrapper {
    margin: -1rem;
}

.contact-social-share .social-share-list-wrapper li {
    width: 7.2rem;
    height: 7.2rem;
    padding: 1rem;
}

/*--Navbar--*/
@media (max-width: 991px) {
    .main-nav-wrapper {
        display: none;
    }
}

.brand-logo {
    max-width: 17rem;
    max-height: 5rem;
}

@media (max-width: 767px) {
    .brand-logo {
        max-height: 5rem;
        max-width: 13rem;
    }
}

.main-navigation {
    margin: 0;
    padding: 0 0 0 4.4rem;
    transition: opacity 0.2s;
}

@media (max-width: 991px) {
    .main-navigation {
        opacity: 0;
        visibility: hidden;
    }
}

.main-navigation li {
    position: relative;
    margin-right: 2rem;
    font-family: var(--primary-font);
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #fff;
    font-weight: var(--p-medium);
    padding: 3.1rem 0.5rem 3rem;
}

.main-navigation li.has-dropdown {
    margin-right: 3.4rem;
}

@media (max-width: 991px) {
    .main-navigation li.has-dropdown {
        margin-right: 0;
    }
}

@media (max-width: 1199px) {
    .main-navigation li {
        margin-right: 1rem;
    }
}

@media (max-width: 991px) {
    .main-navigation li {
        margin-right: 0;
        padding: 0.5rem 0;
        width: 100%;
        text-align: center;
        color: #fff;
        transition: all 0.5s;
    }

    .main-navigation li:hover {
        color: var(--grey-dark-one);
    }
}

.main-navigation li.active>a::before,
.main-navigation li.is-active>a::before {
    width: 100%;
}

.main-navigation a {
    position: relative;
    display: inline-flex;
    font-weight: inherit;
    display: inline;
}

.main-navigation a::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0.2rem;
    background-color: currentColor;
    transition: all 0.5s;
}

.main-navigation a:hover {
    color: inherit;
}

.main-navigation a:hover::before {
    width: 100%;
}

@media (max-width: 991px) {
    .main-navigation a {
        color: var(--color-white);
    }

    .main-navigation a:hover {
        color: var(--color-white);
    }
}

.main-navigation .submenu li.has-dropdown {
    margin-right: 0;
}

.side-navigation li {
    padding: 1rem 0;
}

.navbar {
    padding: 0;
    z-index: 999;
}

@media (max-width: 991px) {
    .navbar {
        padding: 2.2rem 0;
    }
}

.navbar-inner {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
}

.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 25rem;
    background: var(--grey-dark-one);
    padding: 2rem 0;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: all 0.3s var(--cubic-easing);
    transform-origin: top left;
    z-index: 99;
}

.submenu li {
    display: block;
    margin-right: 0;
    padding: 0 3rem;
    font-size: 1.5rem;
    line-height: 3.4rem;
    font-weight: var(--p-regular);
}

@media (max-width: 991px) {
    .submenu li {
        padding: 0 !important;
    }
}

.submenu li a {
    width: 100%;
}

@media (max-width: 991px) {
    .submenu li a {
        width: auto;
    }
}

.submenu li::after {
    position: absolute;
    right: 3rem;
    top: 0;
}

.submenu .submenu {
    top: 0;
    left: 100%;
}

@media (max-width: 1199px) {
    .submenu {
        top: 5.7rem;
    }
}

@media (max-width: 991px) {
    .submenu {
        visibility: visible;
        opacity: 1;
        position: static;
        display: none;
        transition: none;
        padding: 0;
        background: transparent;
        margin-top: 2rem;
        transform: scale(1);
    }
}

.submenu.opened {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    display: block;
}

.submenu .has-dropdown>a::after {
    top: -0.5rem;
}

.has-dropdown {
    position: relative;
}

.has-dropdown>a {
    overflow: visible;
    position: relative;
}

.has-dropdown>a::after {
    content: "\f107";
    position: absolute;
    top: 0.1rem;
    right: -1.5rem;
    font-family: var(--font-awesome);
    font-size: 1.4rem;
    line-height: inherit;
    color: inherit;
    margin-left: 0.5rem;
    width: auto;
    height: auto;
    transition: all 0.5s;
}

@media (max-width: 991px) {
    .has-dropdown {
        text-align: center;
    }
}

.has-dropdown.active>a::after {
    transform: rotate(180deg);
}

.navbar-extra-features {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

@media (max-width: 767px) {
    .navbar-extra-features .btn-small {
        padding: 0.5rem 1rem;
    }
}

.navbar-search {
    position: absolute;
    width: 100vw;
    height: 100%;
    background: var(--grey-light-three);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}

.navbar-search.show-nav-search {
    visibility: visible;
    opacity: 1;
}

.navbar-search .search-field {
    width: 60%;
    margin: 0 auto;
    position: relative;
}

@media (max-width: 991px) {
    .navbar-search .search-field {
        width: 70%;
    }
}

.navbar-search input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    border-bottom: 1px solid var(--grey-dark-one);
}

.navbar-search input:focus {
    outline: 0;
    border-color: var(--primary-color);
}

.navbar-search .navbar-search-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    border: none;
    background: transparent;
    padding: 0.5rem 2rem;
    cursor: pointer;
}

.navbar-search .navbar-search-btn i,
.navbar-search .navbar-search-btn span {
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--grey-light-one);
    transition: all 0.3s;
}

.navbar-search .navbar-search-btn:hover i,
.navbar-search .navbar-search-btn:hover span {
    color: var(--primary-color);
}

.navbar-search .navbar-search-close {
    position: absolute;
    top: 50%;
    right: 3rem;
    font-size: 2.4rem;
    color: var(--grey-dark-one);
    margin-right: 3rem;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: .3s;
}

@media (max-width: 991px) {
    .navbar-search .navbar-search-close {
        right: 0;
        margin-right: 2rem;
        margin-left: 1rem;
    }
}

.navbar-search .navbar-search-close:hover {
    color: var(--primary-color);
}

.nav-search-field-toggler {
    position: relative;
    font-size: 2rem;
    line-height: 4.2rem;
    color: #fff;
    margin-right: 2rem;
    transition: all 0.3s ease-in-out;
    background-color: transparent;
    border: none;
    padding: 0;
}

.nav-search-field-toggler::after {
    content: " ";
    position: absolute;
    width: 4rem;
    height: 4rem;
    background: rgba(255, 255, 255, 0.1);
    top: 50%;
    left: 50%;
    margin: -2rem;
    border-radius: 100%;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
}

.nav-search-field-toggler:hover {
    color: #fff;
}

.nav-search-field-toggler:hover::after {
    transform: scale(1);
}

.side-nav-toggler {
    position: relative;
    display: inline-block;
    padding: 0.8rem 1rem;
    margin-left: 1rem;
    margin-right: -1rem;
    background-color: transparent;
    border: none;
}

.side-nav-toggler span {
    position: relative;
    display: block;
    width: 1.8rem;
    height: 0.2rem;
    background: #fff;
    cursor: pointer;
    margin: 0.5rem 0;
}

.side-nav-toggler::after {
    content: " ";
    position: absolute;
    width: 4rem;
    height: 4rem;
    background: rgba(255, 255, 255, 0.1);
    top: 50%;
    left: 50%;
    margin: -2rem;
    border-radius: 100%;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
}

.side-nav-toggler:hover span {
    animation: menu-toggler-anim 0.2s ease-in-out 0s forwards;
}

.side-nav-toggler:hover span:nth-of-type(2) {
    animation: menu-toggler-anim 0.2s ease-in-out 0.05s forwards;
}

.side-nav-toggler:hover span:nth-of-type(3) {
    animation: menu-toggler-anim 0.2s ease-in-out 0.1s forwards;
}

.side-nav-toggler:hover::after {
    transform: scale(1);
}

.main-nav-toggler {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    background: var(--primary-color);
    border-radius: 100%;
    z-index: 9999;
    padding: 0.7rem 1rem;
    transition: all 0.8s var(--cubic-easing);
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
    transition-delay: 0.4s;
    cursor: pointer;
}

.main-nav-toggler .toggler-inner {
    position: fixed;
    bottom: 2rem;
    right: 2.1rem;
    transition: all 0.2s;
    padding: 7px 10px;

}

.main-nav-toggler span {
    position: relative;
    display: block;
    width: 1.9rem;
    height: 0.2rem;
    background: #fff;
    cursor: pointer;
    margin: 0.5rem 0;
    transition: all 0.2s;
}

.main-nav-toggler.expanded {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
}

/* .main-nav-toggler.expanded .toggler-inner {
  bottom: 3.5rem;
} */
.main-nav-toggler.expanded span:nth-of-type(1) {
    transform: rotate(45deg) translate(1rem, 1rem);
}

.main-nav-toggler.expanded span:nth-of-type(2) {
    opacity: 0;
}

.main-nav-toggler.expanded span:nth-of-type(3) {
    transform: rotate(-45deg);
}

.main-menu-opened {
    overflow: hidden;
}

.main-menu-opened .main-nav-wrapper {
    position: fixed;
    top: 5rem;
    left: 5rem;
    display: flex;
    overflow-x: hidden;
    width: calc(100vw - 10rem);
    height: calc(100vh - 10rem);
    z-index: 99999;
    opacity: 1;
    visibility: visible;
    padding: 6rem 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

@media (max-width: 991px) {
    .main-menu-opened .main-nav-wrapper {
        position: fixed;
        top: 5rem;
        right: 5rem;
        bottom: 5rem;
        left: 5rem;
    }
}

.main-menu-opened .main-navigation {
    position: static;
    display: flex;
    width: 100%;
    height: auto;
    z-index: 99999;
    opacity: 1;
    visibility: visible;
    padding: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main-menu-opened .main-navigation>li {
    /* opacity: 0;
  top: 20px; */
    font-size: 2.4rem;
    line-height: 3.4rem;
    padding: 1rem 0;
}

.navbar__style-three .main-navigation li {
    color: var(--grey-dark-one);
    padding: 3.8rem 0.5rem 3.7rem;
}

@media (max-width: 991px) {
    .navbar__style-three .main-navigation li {
        padding: 1rem 0;
    }
}

.navbar__style-three .main-navigation .submenu li {
    padding: 0 3rem;
}

.navbar__style-three .main-navigation a::before,
.navbar__style-three .main-navigation a::after {
    color: var(--grey-dark-one);
}

@media (max-width: 1199px) {
    .navbar__style-three .main-navigation li {
        color: #fff;
    }

    .navbar__style-three .main-navigation a::before,
    .navbar__style-three .main-navigation a::after {
        color: #fff;
    }
}

.navbar__style-three .nav-search-field-toggler {
    color: var(--grey-dark-one);
    margin-right: 1rem;
}

.navbar__style-three .side-nav-toggler::after {
    background: rgba(0, 0, 0, 0.1);
}

.navbar__style-three .side-nav-toggler span {
    background-color: var(--grey-dark-one);
}

.navbar__style-three .submenu {
    background: var(--grey-light-three);
    box-shadow: var(--shadow-dark);
}

@media (max-width: 991px) {
    .navbar__style-three .submenu {
        background: transparent;
        box-shadow: none;
    }
}

.navbar-toggler-wrapper {
    display: flex;
    align-items: center;
}

.navbar-toggler-wrapper .side-nav-toggler {
    padding: 0;
    margin: 0 2rem 0 0;
}

.navbar__style-four .main-navigation li {
    padding: 1.3rem 0.5rem 1.2rem;
}

.navbar__style-four .submenu li {
    padding: 0 3rem;
}

@media (max-width: 991px) {
    .navbar__style-four {
        padding: 1rem 0;
    }
}

.navbar .container,
.navbar .container-fluid {
    position: static;
}

.navbar.bg-white {
    border-bottom: 1px solid var(--grey-light-two);
}

.navbar.bg-white .main-navigation li {
    color: var(--grey-dark-one);
}

.navbar.bg-white .submenu {
    background: var(--color-white);
    box-shadow: var(--shadow-dark);
}

@media (max-width: 1199px) {
    .navbar.bg-white .submenu {
        background: transparent;
        box-shadow: none;
    }
}

.navbar.bg-white .nav-search-field-toggler {
    color: var(--grey-dark-one);
    margin-right: 1rem;
}

.navbar.bg-white .nav-search-field-toggler:hover {
    color: var(--primary-color);
}

.navbar.bg-white .side-nav-toggler span {
    background: var(--grey-dark-one);
}

.navbar.bg-white .side-nav-toggler:after {
    background: rgba(0, 0, 0, 0.1);
}

/*--Breadcrumb--*/
.breadcrumb-wrapper {
    padding: 2rem 0;
}

.breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0;
    border-radius: 0;
}

.breadcrumb li,
.breadcrumb a {
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--grey-dark-four);
    /* text-transform: capitalize; */
}

.breadcrumb li.active,
.breadcrumb a.active,
.breadcrumb li:hover,
.breadcrumb a:hover {
    color: var(--primary-color);
}

.breadcrumb-item+.breadcrumb-item {
    padding: 0;
}

.breadcrumb-item+.breadcrumb-item::before {
    padding: 0 1rem;
    color: var(--grey-dark-four);
}

/*--Shapes--*/
.axil-shape-circle {
    position: absolute;
    width: 93.7rem;
    height: 93.7rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0.2);
    transition: all 1s;
}

@media (max-width: 1199px) {
    .axil-shape-circle {
        width: 75vw;
        height: 75vw;
    }
}

.axil-shape-circle.shape-loaded {
    transform: scale(1);
}

.axil-shape-circle__two {
    position: absolute;
    width: 93.7rem;
    height: 93.7rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0.2);
    transition: all 1s;
    width: 71rem;
    height: 71rem;
}

@media (max-width: 1199px) {
    .axil-shape-circle__two {
        width: 75vw;
        height: 75vw;
    }
}

.axil-shape-circle__two.shape-loaded {
    transform: scale(1);
}

@media (max-width: 1199px) {
    .axil-shape-circle__two {
        width: 50vw;
        height: 50vw;
    }
}

/*--Posts--*/

/*------------*/
.post-block.post-block__small .post-cat {
    background-color: transparent;
}

.post-block.post-block__small .bg-color-purple-one {
    color: var(--color-purple-one);
}

.post-block.post-block__small .bg-color-blue-grey-one {
    color: var(--color-blue-grey-one);
}

.post-block.post-block__small .bg-color-red-two {
    color: var(--color-red-two);
}

.post-block.post-block__small .bg-color-blue-three {
    color: var(--color-blue-three);
}

.post-block.post-block__small .bg-color-green-one {
    color: var(--color-green-one);
}

.post-block.post-block__small .bg-color-green-two {
    color: var(--color-green-two);
}

.post-block.post-block__small .bg-color-green-three {
    color: var(--color-green-three);
}

.post-block.post-block__small .bg-color-blue-two {
    color: var(--color-blue-two);
}

.post-block.post-block__small .bg-color-blue-one {
    color: var(--color-blue-one);
}

.post-block.post-block__small .post-cat:hover {
    color: var(--primary-color);
}

/*------------*/

.post-block {
    margin-bottom: 3rem;
}

.post-block a span {
    display: block !important;
}

.post-block a .video-play-btn {
    display: inline-flex !important;
}

.post-block>a {
    position: relative;
}

.post-block .axil-post-title {
    font-size: 1.8rem;
    line-height: 2.8rem;
    margin-bottom: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

}

@media (max-width: 991px) {
    .post-block .axil-post-title {
        font-size: 1.4rem;
        line-height: 2.2rem;
        margin-bottom: 1rem;
    }
}

.post-block>a,
.post-block figure>a {
    display: block;
    margin-right: 3rem;
    align-self: flex-start !important;
    overflow: hidden;
}

@media (max-width: 767px) {

    .post-block>a,
    .post-block figure>a {
        margin-right: 2rem;
        align-self: flex-start !important;
    }
}

.post-block>a:hover img,
.post-block figure>a:hover img {
    transform: scale(1.1);
}

.post-block img {
    width: 100%;
    max-width: 15rem;
    margin: 0 !important;
    transition: transform 0.5s;
}

@media (max-width: 767px) {
    .post-block img {
        max-width: 10rem;
        width: 100%;
        margin: 0 !important;
    }
}

.post-block .post-format {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@media (max-width: 767px) {
    .post-block__small {
        display: flex;
    }

    .post-block__small>a,
    .post-block__small figure>a {
        margin: 0 2rem 0 0;
    }

    .post-block__small img {
        max-width: 100%;
        margin: 0 !important;
    }
}

.post-block__on-dark-bg .axil-post-title {
    color: #fff;
}

.post-block__on-dark-bg .post-metas ul {
    color: var(--grey-light-one);
}

.post-block__small {
    margin-bottom: 2rem;
}

.post-block__small .axil-post-title {
    font-size: 1.4rem;
    line-height: 2.4rem;
    margin-bottom: 1rem;
}

.post-block__small img {
    max-width: 10rem;
}

.post-block__small .post-metas ul {
    font-size: 1.2rem;
    line-height: 1.8rem;
}

@media (max-width: 767px) {
    .post-block__mid {
        display: block;
    }

    .post-block__mid>a {
        margin: 0 0 3rem;
    }
}

.post-block__mid .axil-post-title {
    font-size: 2rem;
    line-height: 3rem;
    margin-bottom: 1.5rem;
}

@media (max-width: 991px) {
    .post-block__mid .axil-post-title {
        font-size: 1.6rem;
        line-height: 2.6rem;
        margin-bottom: 1rem;
    }
}

.post-block__mid p {
    margin-bottom: 2rem;
}

@media (max-width: 991px) {
    .post-block__mid p {
        margin-bottom: 1rem;
    }
}

.post-block__mid img {
    max-width: 28.5rem;
}

@media (max-width: 767px) {
    .post-block__mid img {
        max-width: 100%;
    }
}

.post-block__fluid {
    display: block;
}

.post-block__fluid>a {
    margin: 0 0 3rem 0;
}

.post-block__fluid img {
    max-width: 100%;
}

.video-container__type-2 .post-format {
    top: 5rem;
    left: 5rem;
    transform: none;
}

@media (max-width: 991px) {
    .video-container__type-2 .post-format {
        top: 3rem;
        left: 3rem;
    }
}

.post-cat-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.post-cat {
    display: block;
    font-family: var(--secondary-font);
    font-size: 1.1rem;
    line-height: 1.4rem;
    font-weight: var(--s-bold);
    margin: 0 1rem 1rem 0;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
}

.post-metas ul {
    font-family: var(--primary-font);
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: var(--grey-dark-four);
    font-weight: var(--p-light);
    margin: 0;
}

.post-metas ul li .post-author {
    margin-left: 4px;
}

@media (max-width: 991px) {
    .post-metas ul {
        font-size: 1.2rem;
    }
}

.post-metas li {
    position: relative;
    margin-right: 1rem;
}

.post-metas i {
    padding: 0 1rem 0 0;
}

.post-metas i.dot {
    position: relative;
    top: -0.3rem;
}

.post-metas i.separator-line {
    display: inline-flex;
    width: 0.2rem;
    height: 3rem;
    background: var(--grey-light-one);
    padding: 0;
    margin: 0 2rem 0 0;
    vertical-align: -1rem;
}

.banner-post-metas li {
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: var(--grey-dark-four);
    margin-bottom: 0;
}

.post-meta-primary li {
    color: var(--primary-color);
}

.post-meta-primary li a {
    color: inherit;
}

.home-banner-post-metas a img {
    max-width: 5rem;
}

.footer-post-widget .axil-post-title {
    color: #fff;
}

.footer-post-widget .post-metas {
    color: var(--grey-light-one);
}

.axil-recent-news {
    margin-top: -0.9rem;
}

@media (max-width: 991px) {
    .axil-recent-news {
        margin-top: 0;
    }
}

.axil-recent-news .axil-title {
    font-size: 2.4rem;
    line-height: 3.6rem;
}

@media (max-width: 991px) {
    .axil-recent-news .axil-title {
        font-size: 2rem;
        line-height: 3rem;
    }
}

@media (max-width: 991px) {
    .axil-latest-post {
        margin-bottom: 4rem;
    }
}

.axil-latest-post .post-block {
    flex-direction: column;
    justify-content: flex-start;
}

.axil-latest-post .axil-post-title {
    font-size: 2.8rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;
}

@media (max-width: 991px) {
    .axil-latest-post .axil-post-title {
        font-size: 2.2rem;
        line-height: 3.2rem;
    }
}

.axil-latest-post p {
    margin-bottom: 2rem;
}

.axil-latest-post .fig-container {
    position: relative;
    width: 100%;
}

.axil-latest-post .fig-container .post-cat-group {
    position: absolute;
    left: 0;
    bottom: 6rem;
}

.axil-latest-post .post-block>a,
.axil-latest-post .post-block figure>a {
    display: block;
    margin: 0 0 3rem;
}

.axil-latest-post img {
    width: 100%;
    max-width: 100%;
    margin: 0 !important;
}

.axil-post-carousel .owl-nav {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.axil-post-carousel .owl-nav i {
    width: 5rem;
    height: 5rem;
    background: #fff;
    display: block;
    line-height: 5rem;
    text-align: center;
    transition: all 0.5s;
}

.axil-post-carousel .owl-nav button:hover i {
    background: var(--primary-color);
    color: #fff;
}

.owl-nav button:focus {
    outline: 0;
}

.post-block:hover .hover-line a {
    background-size: 100% 2px;
}

.post-block:hover>a img,
.post-block:hover figure>a img {
    transform: scale(1.1);
}

.author-details-block .post-block:hover .hover-line a {
    background-size: 0px 2px;
}

.author-details-block .hover-line:hover a {
    background-size: 100% 2px !important;
}

.line-hover-effect {
    position: relative;
    display: inline;
    background-image: linear-gradient(to right, currentColor 0%, currentColor 100%);
    background-size: 0px 2px;
    background-position: 0px 95%;
    transition: background-size 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
    padding: 0.1% 0px;
    background-repeat: no-repeat;
    color: inherit;
}

.line-hover-effect:hover {
    background-size: 100% 2px;
}

.hover-line a {
    position: relative;
    display: inline;
    background-image: linear-gradient(to right, currentColor 0%, currentColor 100%);
    background-size: 0px 2px;
    background-position: 0px 95%;
    transition: background-size 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
    padding: 0.1% 0px;
    background-repeat: no-repeat;
    color: inherit;
}

.hover-line a:hover {
    background-size: 100% 2px;
}

.post-sidebar {
    padding-left: 3rem;
}

.add-block-widget a {
    display: block;
}

.add-block-widget a span {
    display: block !important;
}

@media (max-width: 1199px) {
    .post-sidebar {
        padding-left: 0;
    }
}

@media (max-width: 991px) {
    .section-title .btn-link {
        display: none;
    }
}

.post-author-with-img {
    display: flex;
    align-items: center;
}

.post-author-with-img img {
    width: 3rem !important;
    height: 3rem !important;
    object-fit: cover;
    /* margin: 0 1rem 0 0!important; */
    border-radius: 100%;
}

.post-author-with-img .author-name {
    margin-left: 1rem;
}



.related-post {
    margin-top: -1.4rem;
}

.axil-post-carousel .owl-item img {
    height: calc(100vh - 16rem);
    object-fit: cover;
}

@media (max-width: 991px) {
    .main-content.fixed-top {
        position: static;
    }
}

/*--Content block--*/
.content-block {
    position: relative;
    display: flex;
    overflow: hidden;
}

.content-block .grad-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.content-block>a {
    display: block;
    width: 100%;
}

.content-block>a img {
    width: 100%;
    transition: all 0.5s;
}

.content-block:hover img {
    transform: scale(1.1) rotate(2deg);
}

.content-block .caption-content {
    transition: all 0.3s;
}

.content-block .media-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    width: 100%;
    padding: 2rem 3rem;
}

.content-block .media-caption .axil-post-title {
    font-size: 1.8rem;
    line-height: 3rem;
    color: #fff;
    margin-bottom: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.content-block .media-caption .caption-meta {
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: var(--grey-light-one);
    margin-top: 1rem;
}

.content-block .media-caption .caption-meta span {
    margin-right: 5px;
}

@media (max-width: 991px) {
    .content-block .media-caption .axil-post-title {
        font-size: 1.6rem;
        line-height: 2.6rem;
    }

    .content-block .media-caption .caption-meta {
        font-size: 1.2rem;
    }
}

.content-block:hover .caption-content {
    transform: translateY(-1rem);
}

/*--Newsletter block--*/
.newsletter-content {
    max-width: 66.5rem;
    margin-left: auto;
    margin-right: auto;
}

.newsletter-icon {
    width: 6rem;
    height: 6rem;
    border-radius: 100%;
    background: rgba(255, 44, 84, 0.1);
    text-align: center;
    line-height: 6rem;
    margin: 0 auto 3rem;
}

.newsletter-icon i {
    font-size: 2.2rem;
    line-height: 6.2rem;
    color: var(--primary-color);
}

.subscription-form .form-group {
    margin-bottom: 2rem;
}

.weekly-newsletter {
    padding: 3rem;
}

.weekly-newsletter .newsletter-icon {
    margin: 0 0 2rem;
}

.weekly-newsletter .axil-title {
    font-size: 2.4rem;
    line-height: 3.6rem;
    margin-bottom: 0rem;
}

@media (max-width: 991px) {
    .weekly-newsletter .axil-title {
        font-size: 2rem;
        line-height: 3rem;
        margin-bottom: 1rem;
    }
}

.weekly-newsletter p {
    color: var(--grey-dark-two);
}

@media (max-width: 991px) {
    .weekly-newsletter p {
        margin-top: 0 !important;
    }
}

/*--Banner--*/
.banner {
    position: relative;
    background-color: var(--grey-light-three);
}

.banner .grad-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
}

.banner .post-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 3rem;
    line-height: 4.2rem;
    color: #fff;
    font-weight: var(--p-bold);
    max-width: 18rem;
}

@media (max-width: 991px) {
    .banner .post-date {
        margin-bottom: 3rem;
    }
}

.banner .post-date span {
    font-size: 4.2rem;
    line-height: 6rem;
}

.banner .video-play-btn-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.banner .post-navigation__banner {
    position: absolute;
    right: 0;
    bottom: 0;
}

.banner__single-post {
    padding: 6rem 0;
}

.banner__single-post .post-main-thumbnail span {
    display: block !important;
}


@media (max-width: 991px) {
    .banner__single-post img {
        margin-top: 3rem;
    }
}

.banner__standard {
    padding: 0;
}

@media (max-width: 991px) {
    .banner__standard {
        padding: 6rem 0;
    }
}

.banner__default {
    padding: 6rem 0;
}

.banner__single-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 45rem;
    background-color: var(--grey-dark-two);
}

.banner__single-hero .post-title {
    color: #fff;
}

.banner__single-hero .banner-post-metas li {
    color: #fff;
}

.banner__single-type-two {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100vh - 19.2rem);
    min-height: 70rem;
    background-color: var(--grey-dark-two);
}

@media (max-width: 991px) {
    .banner__single-type-two {
        height: auto;
        min-height: auto;
        padding-bottom: 13rem;
    }
}

.banner__single-type-two .post-title {
    color: #fff;
}

.banner__single-type-two .banner-post-metas li {
    color: #fff;
}

@media (max-width: 991px) {
    .banner img {
        width: 100%;
    }
}

.banner-home__with-post {
    background: #fff;
    padding-bottom: 6rem;
}

.banner-home__with-post .banner-left-content {
    position: relative;
    padding: 24rem 8rem 24rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.banner-home__with-post .banner-left-content::before {
    content: " ";
    width: 70%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

@media (min-width: 1599px) {
    .banner-home__with-post .banner-left-content::before {
        width: 60%;
    }
}

@media (max-width: 1199px) {
    .banner-home__with-post .banner-left-content::before {
        width: 100%;
    }
}

.banner-home__with-post .banner-left-content .post-title-wrapper {
    position: relative;
    z-index: 2;
    max-width: 50rem;
}

@media (max-width: 991px) {
    .banner-home__with-post .banner-left-content {
        padding: 6rem 1.5rem;
    }
}

@media (max-width: 991px) {
    .banner-home__with-post {
        padding-bottom: 4rem;
    }
}

.load-anim {
    position: relative;
    top: 5rem;
    opacity: 0;
    transition: all 0.6s ease-in-out;
}

.axil-banner-sidebar {
    padding: 5.5rem 7.5rem 0;
    height: 100%;
    background-color: #fff;
    position: relative;
}

.axil-banner-sidebar::before {
    content: " ";
    position: absolute;
    bottom: -4rem;
    left: -13rem;
    right: 0;
    height: 4rem;
    background: var(--primary-color);
}

.axil-banner-sidebar .post-block {
    position: relative;
    padding: 2rem 3rem;
    margin-right: 6rem;
}

.axil-banner-sidebar .post-block p {
    margin-bottom: 0;
}

.axil-banner-sidebar .post-block::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 0.5rem);
    height: 100%;
    background: linear-gradient(to right, var(--grey-light-two), #fff);
    opacity: 0;
    z-index: 1;
    transition: all 0.3s;
}

.axil-banner-sidebar .post-block .media-body {
    position: relative;
    z-index: 2;
}

.axil-banner-sidebar .post-block:hover::before {
    opacity: 1;
}

.axil-banner-sidebar .banner-social-share-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
}

@media (max-width: 1199px) {
    .axil-banner-sidebar {
        padding: 5.5rem 3rem 0;
    }

    .axil-banner-sidebar .post-block {
        margin-right: 0;
        padding: 2rem;
    }
}

@media (max-width: 991px) {
    .axil-banner-sidebar {
        padding-right: 7rem;
    }
}

.axil-scroll-up-down {
    position: absolute;
    bottom: 5.5rem;
    left: 10.5rem;
    display: flex;
    align-items: center;
    margin: -0.5rem;
}

.axil-scroll-up-down button {
    width: 0;
    height: 0;
    border-left: 1.1rem solid transparent;
    border-right: 1.1rem solid transparent;
    border-top: 1.5rem solid var(--primary-color);
    margin: 0.5rem;
    background-color: transparent;
    border-bottom: none;
    padding: 0;
}

.axil-scroll-up-down button:nth-of-type(2) {
    border-top: 0;
    border-bottom: 1.5rem solid var(--primary-color);
}

@media (max-width: 991px) {
    .axil-scroll-up-down {
        bottom: auto;
        left: auto;
        right: 20px;
        top: 55px;
        flex-direction: column;
    }
}

.post-counter {
    font-size: 3rem;
    line-height: 4.2rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-bold);
}

.axil-banner-sidebar-media-wrapper {
    max-height: 62rem;
    overflow-x: hidden;
    margin-right: 1rem;
    padding-top: 5rem;
    border-top: 0.4rem solid var(--grey-dark-one);
}

@media (max-width: 1199px) {
    .axil-banner-sidebar-media-wrapper {
        max-height: 53rem;
    }
}

@media (max-width: 991px) {
    .axil-banner-sidebar-media-wrapper {
        max-height: 38rem;
        padding: 2rem 0 0;
        margin-bottom: 2rem;
    }
}

/*--Banner slider--*/
.banner__home-with-slider {
    background-color: #fff;
}

@media (max-width: 1199px) {
    .banner__home-with-slider {
        padding: 6rem 0;
    }
}

.banner__home-with-slider-two {
    padding: 5rem 0 8.7rem;
}

@media (max-width: 1199px) {
    .banner__home-with-slider-two {
        padding: 6rem 0;
    }
}

@media (max-width: 991px) {
    .banner__home-with-slider-two {
        padding: 6rem 0 11rem;
    }
}

.banner-slider-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 0;
    height: 71.7rem;
}

@media (max-width: 991px) {
    .banner-slider-container {
        height: auto;
    }
}

.banner-slider-container .owl-dots,
.banner-slider-container .slick-dots {
    list-style: none;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    position: absolute;
    bottom: 5rem;
}

.banner-slider-container .owl-dots button,
.banner-slider-container .slick-dots button,
.banner-slider-container .owl-dots li,
.banner-slider-container .slick-dots li button {
    width: 2.7rem;
    height: 0.3rem;
    margin: 0 0.5rem;
    transition: all 0.3s;
}

.banner-slider-container .owl-dots button:focus,
.banner-slider-container .slick-dots button:focus,
.banner-slider-container .owl-dots li:focus,
.banner-slider-container .slick-dots li:focus {
    outline: 0;
}

.banner-slider-container .owl-dots button.active,
.banner-slider-container .slick-dots button.active,
.banner-slider-container .owl-dots li.active,
.banner-slider-container .slick-dots li.active,
.banner-slider-container .owl-dots button.slick-active,
.banner-slider-container .slick-dots button.slick-active,
.banner-slider-container .owl-dots li.slick-active,
.banner-slider-container .slick-dots li.slick-active button {
    height: 0.5rem;
    background: var(--primary-color);
}

.banner-slider-container .owl-dots button button,
.banner-slider-container .slick-dots button button,
.banner-slider-container .owl-dots li button,
.banner-slider-container .slick-dots li button {
    font-size: 0;
    background: var(--grey-light-one);
    border: none;
}

.banner-slider-container .slick-dots {
    display: flex !important;
    align-items: flex-end;
    padding: 0;
    height: 0.5rem;
}

@media (max-width: 1199px) {
    .banner-slider-container {
        padding: 0 0 4rem;
    }

    .banner-slider-container .owl-dots,
    .banner-slider-container .slick-dots {
        display: none !important;
    }
}

.banner-slider-container-two {
    padding: 0 0 6rem;
}

.banner-slider-container-two .owl-dots,
.banner-slider-container-two .slick-dots {
    display: none !important;
}

.banner-slider-container-two .post-metas li {
    color: var(--grey-dark-three);
}

.banner-slider-container-two .post-metas li a {
    color: var(--grey-dark-three);
}

.banner-slider-container-two .post-metas i.separator-line {
    background-color: var(--grey-mid);
}

.banner__home-with-slider-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 60%;
    background: var(--grey-light-three);
}

@media (max-width: 1199px) {
    .banner__home-with-slider-overlay {
        width: 100%;
    }
}

.banner-slider-container-synced {
    width: 50vw;
    position: absolute;
    left: 50%;
    top: 0;
}

.banner-slider-container-synced .item img {
    width: 100%;
    height: 60rem;
    object-fit: cover;
}

@media (max-width: 1199px) {
    .banner-slider-container-synced .item img {
        height: auto;
    }
}

.banner-slider-container-synced .owl-dots {
    display: none;
}

.banner-slider-container-synced .owl-nav,
.banner-slider-container-synced .slick-arrow {
    position: absolute;
    bottom: -7.4rem;
    left: 0;
    background: transparent;
    border: none;
    padding: 0;
    z-index: 9;
    cursor: pointer;
}

@media (max-width: 991px) {

    .banner-slider-container-synced .owl-nav,
    .banner-slider-container-synced .slick-arrow {
        bottom: -10.9rem;
        left: 0;
    }
}

.banner-slider-container-synced .owl-nav i,
.banner-slider-container-synced .slick-arrow i {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.2rem;
    height: 4.2rem;
    border: 0.1rem solid var(--grey-light-one);
    font-size: 1.4rem;
    color: var(--grey-mid);
    border-radius: 100%;
    transition: all 0.5s;
}

.banner-slider-container-synced .owl-nav button,
.banner-slider-container-synced .slick-arrow button {
    margin-right: 2rem;
}

.banner-slider-container-synced .owl-nav button:focus,
.banner-slider-container-synced .slick-arrow button:focus {
    outline: 0;
}

.banner-slider-container-synced .owl-nav button:hover i,
.banner-slider-container-synced .slick-arrow button:hover i {
    color: var(--grey-dark-one);
}

.banner-slider-container-synced .owl-nav.slick-next,
.banner-slider-container-synced .slick-arrow.slick-next {
    left: 5.2rem;
}

.banner-slider-container-synced .owl-nav:focus,
.banner-slider-container-synced .slick-arrow:focus {
    outline: 0;
}

.banner-slider-container-synced .owl-nav:hover i,
.banner-slider-container-synced .slick-arrow:hover i {
    color: var(--grey-dark-one);
}

@media (max-width: 1199px) {
    .banner-slider-container-synced {
        position: static;
        width: 100%;
        margin: 0 auto 4.8rem;
    }

    .banner-slider-container-synced .item img {
        height: auto;
    }

    .banner-slider-container-synced .banner-shares {
        position: static;
        margin: 2rem 0 0 !important;
    }

    .banner-slider-container-synced .owl-nav {
        position: absolute;
        right: 0;
        bottom: -6.2rem;
    }

    .banner-slider-container-synced .owl-nav button {
        margin: 0 0 0 2rem;
    }
}

@media (max-width: 1199px) and (max-width: 767px) {
    .banner-slider-container-synced .owl-nav {
        position: static;
        margin-top: 2rem;
    }

    .banner-slider-container-synced .owl-nav button {
        margin: 0 2rem 0 0;
    }
}

.social-share-wrapper {
    overflow: hidden;
}

.social-share-wrapper .social-share {
    flex-wrap: nowrap;
}

.social-share-wrapper .social-share li {
    margin-left: -100%;
    transition: all 1s;
}

.social-share-wrapper.show-shares li {
    margin-left: 0;
}

.banner-shares {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 240px;
    z-index: 99;
}

.banner-shares .toggle-shares {
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-bold);
    margin-right: 2rem;
    cursor: pointer;
    transition: all 0.3s;
}

.banner-shares .toggle-shares span {
    margin-left: 1rem;
}

.banner-shares .toggle-shares:hover {
    color: var(--primary-color);
}

.banner-slider-container-synced__two {
    width: 42.5vw;
    left: 59.5%;
}

.banner-slider-container-synced__two .owl-carousel {
    overflow: hidden;
}

.banner-slider-container-synced__two .owl-stage-outer {
    margin-left: -39rem;
    margin-right: 28.5rem;
}

.banner-slider-container-synced__two .owl-stage,
.banner-slider-container-synced__two .slick-track {
    height: 60rem;
}

@media (max-width: 1199px) {

    .banner-slider-container-synced__two .owl-stage,
    .banner-slider-container-synced__two .slick-track {
        height: auto;
    }
}

.banner-slider-container-synced__two .owl-dots {
    display: none;
}

.banner-slider-container-synced__two .owl-item img,
.banner-slider-container-synced__two .slick-slide img {
    width: 52.5rem !important;
    height: 55rem !important;
    padding-right: 3rem !important;
    padding-bottom: 0 !important;
    max-width: initial !important;
    transition: all 0.2s;
}

.banner-slider-container-synced__two .owl-item.center img,
.banner-slider-container-synced__two .slick-slide.center img,
.banner-slider-container-synced__two .owl-item.slick-center img,
.banner-slider-container-synced__two .slick-slide.slick-center img {
    width: 18rem !important;
    height: 20rem !important;
    margin-bottom: 7.3rem !important;
    padding-right: 0 !important;
    margin-left: 11.7rem !important;
}

.banner-slider-container-synced__two .owl-stage,
.banner-slider-container-synced__two .slick-track {
    display: flex;
    align-items: flex-end;
}

.banner-slider-container-synced__two .owl-nav,
.banner-slider-container-synced__two .slick-arrow {
    position: absolute;
    left: auto;
    right: 25rem;
    z-index: 99;
    bottom: 0.9rem;
}

@media (max-width: 1199px) {

    .banner-slider-container-synced__two .owl-nav,
    .banner-slider-container-synced__two .slick-arrow {
        right: 36.4rem;
    }
}

.banner-slider-container-synced__two .owl-nav.slick-next,
.banner-slider-container-synced__two .slick-arrow.slick-next {
    left: auto;
    right: 18.8rem;
}

@media (max-width: 1199px) {

    .banner-slider-container-synced__two .owl-nav.slick-next,
    .banner-slider-container-synced__two .slick-arrow.slick-next {
        right: 30.1rem;
    }
}

.banner-slider-container-synced__two .owl-nav i,
.banner-slider-container-synced__two .slick-arrow i {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}

.banner-slider-container-synced__two .owl-nav button:hover i,
.banner-slider-container-synced__two .slick-arrow button:hover i {
    background: #ffffff;
    color: var(--primary-color);
}

@media (max-width: 1499px) {
    .banner-slider-container-synced__two {
        left: 50%;
    }

    .banner-slider-container-synced__two .owl-stage-outer {
        margin-right: 12rem;
    }

    .banner-slider-container-synced__two .owl-nav {
        right: 17.6rem;
    }
}

@media (max-width: 1199px) {
    .banner-slider-container-synced__two {
        position: static;
        width: 100%;
    }

    .banner-slider-container-synced__two .owl-stage-outer {
        margin: 0;
    }

    .banner-slider-container-synced__two .owl-stage {
        height: auto;
    }

    .banner-slider-container-synced__two .owl-nav {
        right: 0;
        bottom: -6.2rem;
    }

    .banner-slider-container-synced__two .owl-nav button {
        margin: 0 0 0 2rem;
    }

    .banner-slider-container-synced__two .owl-item.center img {
        width: 100%;
        height: auto;
    }

    .banner-slider-container-synced__two .owl-item img {
        width: 100%;
        height: auto;
        padding: 0;
    }

    .banner-slider-container-synced__two .owl-carousel {
        overflow: visible;
    }

    .banner-slider-container-synced__two .banner-shares {
        position: static;
        transform: none;
    }

    .banner-slider-container-synced__two .banner-shares li {
        transform: rotate(0);
    }
}

@media (max-width: 767px) {
    .banner-slider-container-synced__two .owl-nav {
        position: static;
        margin-top: 2rem;
    }

    .banner-slider-container-synced__two .owl-nav button {
        margin: 0 2rem 0 0;
    }
}

.banner__home-with-slider-two .axil-shape-circle {
    top: -65%;
    left: 50%;
    transform: translateX(-50%) scale(0);
}

@media (max-width: 1199px) {
    .banner__home-with-slider-two .axil-shape-circle {
        top: -50vw;
    }
}

.banner__home-with-slider-two .axil-shape-circle__two {
    bottom: -30%;
    left: -15%;
}

@media (max-width: 1199px) {
    .banner__home-with-slider-two .axil-shape-circle__two {
        bottom: -20vw;
        left: -15vw;
    }
}

.banner__home-with-slider-two .axil-shape-circle.shape-loaded {
    transform: translateX(-50%) scale(1);
}

.slick-banner-shares {
    bottom: -7rem;
}

@media (max-width: 1199px) {
    .banner-slider-container-synced__two {
        margin-bottom: 0;
    }
}

.banner-slider-container-synced__two .slick-initialized .slick-slide {
    display: flex;
    align-items: flex-end;
}

.banner-share-slider-container {
    position: absolute;
    bottom: -7rem;
    left: 240px;
    z-index: 99;
}

.banner-share-slider-container .banner-shares {
    position: static;
    margin-top: 0;
}

@media (max-width: 991px) {
    .banner-share-slider-container {
        position: static;
    }
}

.banner-share-slider-container__two {
    position: absolute;
    bottom: 62.5rem;
    left: 9rem;
    z-index: 999;
    transform: rotate(-90deg);
}

.banner-share-slider-container__two li {
    transform: rotate(90deg);
}

@media (min-width: 1599px) {
    .banner-share-slider-container__two {
        bottom: 67.2rem;
        left: 12rem;
    }
}

@media (max-width: 1199px) {
    .banner-share-slider-container__two {
        position: static;
        transform: none;
        margin-top: 1rem;
    }

    .banner-share-slider-container__two li {
        transform: none;
    }
}

@media (max-width: 991px) {
    .banner-slider-container-synced__two .slick-slide.slick-center img {
        margin-left: 6rem;
    }
}

@media (max-width: 991px) {
    .banner-slider-container-synced__two .slick-slide img {
        width: 100%;
        height: auto;
        padding: 0;
    }
}

@media (max-width: 991px) {
    .banner-slider-container-synced__two .slick-arrow {
        bottom: -10.9rem;
        right: auto;
        left: 0;
    }

    .banner-slider-container-synced__two .slick-arrow.slick-next {
        right: auto;
        left: 5.2rem;
    }

    .banner-slider-container-synced__two .slick-arrow i {
        border-color: var(--grey-dark-one);
        color: var(--grey-dark-one);
    }

    .banner-slider-container-synced__two .slick-arrow:hover i {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
}

.banner-slider-container .slick-slider {
    position: static;
}

/*--Banner category counter--*/
.axil-banner-cat-counter {
    margin-top: -14rem;
    background-color: var(--grey-light-three);
}

@media (max-width: 1199px) {
    .axil-banner-cat-counter {
        margin-top: 6rem;
    }
}

.axil-banner-cat-counter .axil-content {
    position: relative;
    background: #fff;
}

.axil-banner-cat-counter .axil-content::before {
    content: " ";
    position: absolute;
    top: 5rem;
    right: 5.5rem;
    bottom: -2rem;
    left: 5.5rem;
    background: rgba(18, 18, 19, 0.2);
    filter: blur(12px);
}

@media (max-width: 1199px) {
    .axil-banner-cat-counter .axil-content {
        margin-top: 6rem;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    }

    .axil-banner-cat-counter .axil-content::before {
        display: none;
    }
}

.axil-banner-cat-counter .category-list-wrapper {
    position: relative;
    background: #fff;
    margin: 0 -2.5rem;
    padding: 3rem;
}

.axil-banner-cat-counter .category-list-wrapper li {
    width: 20%;
    padding: 3rem;
}

@media (max-width: 1199px) {
    .axil-banner-cat-counter .category-list-wrapper {
        justify-content: center;
        margin: 0;
    }

    .axil-banner-cat-counter .category-list-wrapper li {
        width: 25%;
        padding: 1rem;
    }
}

@media (max-width: 767px) {
    .axil-banner-cat-counter .category-list-wrapper {
        padding: 1rem;
    }

    .axil-banner-cat-counter .category-list-wrapper li {
        width: 50%;
        padding: 1rem;
    }
}

/*--Post details--*/
article ul {
    margin-bottom: 3rem;
}

article li {
    margin-bottom: 1rem;
}

.single-blog-wrapper {
    margin: 0;
    padding: 0;
    text-align: justify;
}

.post-details h3 {
    font-size: 2.4rem;
    line-height: 3.6rem;
    margin: 5rem 0 3rem;
}

.post-details figure {
    margin-bottom: 3rem;
}

.post-details figure img {
    width: 100%;
    margin: 0;
}

.axil-post-title {
    font-size: 3.6rem;
}

@media (max-width: 767px) {
    .axil-post-title {
        font-size: 2.4rem;
    }
}

figcaption {
    font-family: var(--secondary-font);
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: var(--grey-dark-three);
    margin: 2rem 0 0;
}

blockquote,
blockquote p,
.blockquote,
.blockquote p {
    font-family: var(--primary-font);
    font-size: 1.8rem;
    line-height: 3rem;
    color: var(--grey-dark-one);
}

@media (max-width: 767px) {

    blockquote,
    blockquote p,
    .blockquote,
    .blockquote p {
        font-size: 1.6rem;
        line-height: 3rem;
        padding: 4rem;
    }
}

blockquote,
.blockquote {
    padding: 5rem 7.5rem;
    background: var(--grey-light-three);
    margin: 5rem 0;
}

@media (max-width: 767px) {

    blockquote,
    .blockquote {
        padding: 4rem;
    }
}

blockquote figure,
.blockquote figure {
    max-width: 40%;
}

blockquote img,
.blockquote img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

blockquote__with-image,
.blockquote__with-image {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 3rem;
}

blockquote__with-image figure,
.blockquote__with-image figure {
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 0;
}

blockquote__with-image img,
.blockquote__with-image img {
    padding-right: 5rem;
    margin: 0;
}

@media (max-width: 767px) {

    blockquote__with-image,
    .blockquote__with-image {
        flex-direction: column;
        align-items: flex-start;
    }

    blockquote__with-image figure,
    .blockquote__with-image figure {
        width: 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }

    blockquote__with-image figure img,
    .blockquote__with-image figure img {
        padding-right: 0;
        padding-bottom: 5rem;
    }
}

blockquote p,
.blockquote p {
    position: relative;
    padding: 0;
    margin: 0;
}

blockquote p::before,
.blockquote p::before {
    content: '"';
    position: absolute;
    top: -0.2rem;
    left: -1rem;
    font-family: var(--secondary-font);
    font-size: 4rem;
    line-height: 1rem;
    color: var(--primary-color);
    font-weight: var(--s-bold);
}

.about-author h3 {
    font-size: 1.8rem;
    line-height: 3rem;
    margin-bottom: 1.5rem;
}

.about-author a img {
    max-width: 10.5rem;
    margin: 0 4rem 2rem 0;
}

.about-author .media-body {
    margin-left: 4rem;
}

@media (max-width: 767px) {
    .about-author a img {
        max-width: 6.5rem;
    }
}

.about-author p {
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: var(--grey-dark-three);
    margin-bottom: 2rem;
}

@media (max-width: 767px) {
    .about-author .media {
        /* flex-direction: column; */
    }
}

.comment-box h2 {
    font-size: 2.4rem;
    line-height: 3rem;
    margin-bottom: 2rem;
}

.comment-box p {
    font-size: 1.6rem;
    line-height: 2.8rem;
}

.comment-form textarea.form-control {
    min-height: 18rem;
}

.post-navigation-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
}

.post-navigation-wrapper .post-navigation {
    position: relative;
    background: url(../../public/images/others/post-nav-bg.jpg);
    background-size: calc(100% - 0.4rem) 100%;
    background-repeat: no-repeat;
    background-position: center center;
    transition: all 0.5s;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}

@media (max-width: 767px) {
    .post-navigation-wrapper .post-navigation {
        width: 100%;
        margin: 0 0 1rem;
    }

    .post-navigation-wrapper .post-navigation:nth-last-of-type(1) {
        margin-bottom: 0;
    }
}

.post-navigation-wrapper .post-navigation::after {
    content: " ";
    width: calc(100% - 0.4rem);
    height: 100%;
    background: linear-gradient(180deg, rgba(18, 18, 19, 0) 0%, #121213 100%);
    position: absolute;
    top: 0;
    left: 0.2rem;
    opacity: 0;
    transition: all 0.5s;
}

.post-navigation-wrapper .post-navigation .post-nav-content {
    height: 100%;
    padding: 3rem;
    background-color: var(--grey-light-three);
    transition: all 0.5s;
}

@media (max-width: 767px) {
    .post-navigation-wrapper .post-navigation .post-nav-content {
        text-align: left;
    }
}

.post-navigation-wrapper .post-navigation i {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    background: transparent;
    text-align: center;
    font-size: 1.4rem;
    line-height: 3rem;
    transition: all 0.5s;
}

.post-navigation-wrapper .post-navigation>div {
    position: relative;
    z-index: 2;
}

.post-navigation-wrapper .post-navigation>a {
    font-family: var(--secondary-font);
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: var(--grey-dark-three);
}

.post-navigation-wrapper .post-navigation h3 a {
    position: relative;
    display: inline;
    background-image: linear-gradient(to right, currentColor 0%, currentColor 100%);
    background-size: 0px 2px;
    background-position: 0px 95%;
    transition: background-size 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
    padding: 0.1% 0px;
    background-repeat: no-repeat;
    color: inherit;
}

.post-navigation-wrapper .post-navigation h3 a:hover {
    background-size: 100% 2px;
}

.post-navigation-wrapper .post-navigation h3 a {
    color: inherit;
}

.post-navigation-wrapper .post-navigation:hover .post-nav-content {
    background: transparent;
}

.post-navigation-wrapper .post-navigation:hover::after {
    opacity: 1;
}

.post-navigation-wrapper .post-navigation:hover a {
    color: #fff;
}

.post-navigation-wrapper .post-navigation:hover i {
    background: var(--primary-color);
    color: #fff;
}

.post-navigation-wrapper .prev-post i {
    margin-right: 1rem;
}

.post-navigation-wrapper .next-post i {
    margin-left: 1rem;
}

.post-navigation-wrapper h3 {
    font-size: 1.8rem;
    line-height: 3rem;
    text-align: left;
    margin: 1rem 0 0;
    transition: all 0.3s;
}

.post-shares {
    display: flex;
    align-items: center;
}

.post-shares .title {
    font-size: 1.8rem;
    line-height: 2.2rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-bold);
    margin: 0 3rem 1rem 0;
}

@media (max-width: 767px) {
    .post-shares .title {
        margin-right: 3rem;
    }
}

.post-shares li {
    margin: 0 1rem 1rem 0;
}

.post-shares li a {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--secondary-font);
    line-height: 2.1rem;
    font-weight: var(--p-bold);
    letter-spacing: 0.1rem;
    color: #FFFFFF;
    padding: 1.4rem 4rem 1.3rem;
    border-width: 0.2rem;
    border-style: solid;
    border-radius: 0;
    z-index: 1;
    font-size: 1.4rem;
    color: #fff;
    padding: 0.8rem 4rem 0.7rem;
}

.post-shares li a::before {
    content: " ";
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;
    transition: all 0.5s;
}

.post-shares li a.btn-primary {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

.post-shares li a.btn-primary.btn-nofill {
    color: var(--primary-color);
}

.post-shares li a.btn-primary:focus,
.post-shares li a.btn-primary:active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    box-shadow: none;
    color: #fff;
}

.post-shares li a.btn-secondary {
    background: var(--grey-mid);
    border-color: var(--grey-mid);
}

.post-shares li a.btn-secondary.btn-nofill {
    color: var(--grey-dark-four);
}

.post-shares li a.btn-nofill {
    background: transparent;
    transition: all 0.5s;
}

.post-shares li a.btn-nofill:hover {
    background: var(--primary-color);
    color: #fff;
}

.post-shares li a.btn-small {
    font-size: 1.2rem;
    line-height: 1.6rem;
    padding: 1.1rem 3rem;
}

.post-shares li a:hover {
    color: #fff;
}

.post-shares li a:hover::before {
    width: 100%;
    right: auto;
    left: 0;
}

.post-shares li a i {
    font-size: 1.8rem;
    margin-right: 1rem;
    position: relative;
    top: -0.1rem;
}

@media (max-width: 767px) {
    .post-shares li a {
        padding: 0.5rem 2rem 0.4rem;
    }

    .post-shares li a i {
        font-size: 1.4rem;
    }
}

.post-navigation__banner {
    margin-left: 0;
    margin-right: 0;
    background: #fff;
}

.post-navigation__banner .post-navigation {
    width: auto;
    margin: 0;
    background: transparent;
    position: relative;
}

.post-navigation__banner .post-navigation .post-nav-content {
    background-color: transparent;
    padding: 3rem 2rem;
    padding-right: 1rem;
    cursor: pointer;
}

@media (max-width: 991px) {
    .post-navigation__banner .post-navigation .post-nav-content {
        padding: 2.5rem 2rem;
    }
}

.post-navigation__banner .post-navigation i {
    border: 0.1rem solid var(--grey-light-one);
}

.post-navigation__banner .post-navigation::after {
    display: none;
}

.post-navigation__banner .post-navigation:nth-last-of-type(1) .post-nav-content {
    padding-right: 2rem;
    padding-left: 1rem;
}

.post-navigation__banner .post-navigation:nth-last-of-type(1)::before {
    content: "/";
    position: absolute;
    left: -0.4rem;
    font-size: 2.4rem;
    line-height: 3.6rem;
    color: var(--grey-dark-one);
    padding: 3rem 0;
}

@media (max-width: 991px) {
    .post-navigation__banner .post-navigation:nth-last-of-type(1)::before {
        padding: 2.5rem 0;
    }
}

.post-navigation__banner .post-navigation:hover a {
    color: var(--primary-color);
}

.post-navigation__banner .post-navigation:hover i {
    border-color: var(--primary-color);
}

ul.gallery {
    list-style: none;
    padding: 0;
    margin-bottom: 0;
}

ul.gallery img {
    margin-bottom: 0;
}

.masonry-grid {
    margin: -0.5rem;
    margin-bottom: 1.5rem;
}

.masonry-grid .grid-item {
    padding: 0.5rem;
    margin: 0;
}

.masonry-grid figure {
    margin-bottom: 0;
}

.masonry-grid img {
    margin-bottom: 0;
}

.figure-extended {
    margin-left: -10rem;
    margin-right: -10rem;
}

/*--Header top--*/
.header-top {
    padding: 0.5rem 0;
    position: relative;
    z-index: 999;
}

@media (max-width: 991px) {
    .header-top {
        display: none;
    }
}

.header-top li,
.header-top .current-date {
    display: block;
    font-family: var(--secondary-font);
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--grey-dark-six);
    font-weight: var(--s-regular);
    padding: 0.5rem;
    transition: all 0.3s;
}

.header-top li span,
.header-top .current-date span {
    margin-left: 1.6rem;
}

.header-top li.is-active,
.header-top .current-date.is-active {
    color: var(--primary-color);
}

.header-top .current-date {
    padding: 0.5rem 0;
}

@media (max-width: 767px) {
    .header-top .current-date {
        display: block;
        width: 100%;
        text-align: center;
    }
}

.header-top__style-two {
    padding: 1.2rem 0;
}

.header-top-nav {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
}

.header-top-nav li:not(:nth-last-of-type(1)) {
    margin-right: 2rem;
}

.header-top__social-share li {
    margin: 0 0 0 2rem;
}

.header-top__social-share li a {
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--grey-dark-six);
    padding: 0;
}

.header-top__social-share li a:hover {
    color: var(--primary-color);
}

/*--Sidenav--*/
.offcanvas-menu.offcanvas.offcanvas-end,
.offcanvas-menu.offcanvas.offcanvas-start {
    width: 60vw;
    height: 100vh;
    transition: all 0.8s var(--cubic-easing);
}

@media only screen and (max-width: 1199px) {

    .offcanvas-menu.offcanvas.offcanvas-end,
    .offcanvas-menu.offcanvas.offcanvas-start {
        width: 100vw;
    }
}

.side-nav {
    width: 60vw;
    height: 100vh;
    background: var(--color-white);
    z-index: 9999;
    padding: 10.5rem;
    transition: all 0.8s var(--cubic-easing);
}

.side-nav ::placeholder {
    color: var(--grey-mid);
    opacity: 1;
}

.side-nav :-ms-input-placeholder {
    color: var(--grey-mid);
}

.side-nav ::-ms-input-placeholder {
    color: var(--grey-mid);
}

.side-nav.opened {
    right: 0;
}

@media (max-width: 1199px) {
    .side-nav {
        width: 100vw;
        right: -100vw;
        padding: 2rem;
    }

    .side-nav.opened {
        right: 0;
    }
}

.side-nav__left {
    right: auto;
    left: -61vw;
}

.side-nav__left.opened {
    left: 0;
}

@media (max-width: 1199px) {
    .side-nav__left {
        left: -100vw;
    }
}

.side-nav .side-navigation {
    padding: 0;
    align-items: flex-start;
}

.side-nav .side-navigation li {
    font-size: 3.6rem;
    line-height: 5rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-semi-bold);
    margin-bottom: 3rem;
    padding: 0;
    text-align: left;
}

.side-nav .side-navigation li a {
    background: none;
}

.side-nav .side-navigation li.hovered {
    color: var(--grey-dark-one);
}

.side-nav .side-navigation li.hover-removed {
    color: var(--grey-light-one);
}

.side-nav .side-navigation a::before {
    display: none;
}

.side-nav .side-navigation a:hover {
    color: inherit;
}

.side-nav .side-navigation a::after {
    bottom: -3.5rem;
}

@media (max-width: 991px) {
    .side-nav .side-navigation {
        visibility: visible;
        opacity: 1;
        margin-bottom: 1.5rem;
    }

    .side-nav .side-navigation li {
        font-size: 2rem;
        line-height: 2rem;
    }

    .side-nav .side-navigation a {
        color: inherit;
    }
}

@media (max-width: 991px) {
    .side-nav .side-navigation li {
        font-size: 1.6rem;
        line-height: 2.6rem;
        margin-bottom: 1rem;
    }
}

.side-nav form {
    margin-bottom: 8rem;
}

@media (max-width: 991px) {
    .side-nav form {
        margin-bottom: 4rem;
    }
}

.side-nav form .input-border {
    stroke-width: 4px;
}

@media (max-width: 991px) {
    .side-nav form {
        font-size: 2rem;
        bottom: 0.5rem;
    }
}

.side-nav .side-nav-search-btn {
    position: absolute;
    right: 0;
    bottom: 1.8rem;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
}

.side-nav .side-nav-search-btn i {
    font-size: 2rem;
    color: var(--grey-mid);
    transition: all 0.5s;
    font-weight: 400;
}

.side-nav .side-nav-search-btn:hover i {
    color: var(--primary-color);
}

@media (max-width: 767px) {
    .side-nav .side-nav-search-btn {
        bottom: 1rem;
        right: 2rem;
    }

    .side-nav .side-nav-search-btn i {
        font-size: 1.6rem;
    }
}

.side-nav input {
    font-family: var(--primary-font);
    font-size: 3rem;
    line-height: 1;
    color: var(--grey-dark-one);
    font-weight: var(--p-medium);
    padding: 1.2rem 0;
    border: none;
    border-bottom: 2px solid var(--grey-mid);
}

@media (max-width: 767px) {
    .side-nav input {
        font-size: 1.6rem;
        padding: 0.9rem 0;
    }
}

.side-nav .focused input {
    border-color: var(--primary-color);
}

.side-nav .form-group.focused .input-txt {
    transform: translateY(6rem);
}

@media (max-width: 767px) {
    .side-nav .form-group.focused .input-txt {
        transform: translateY(4rem);
    }
}

.axil-contact-info-inner {
    padding: 0;
    margin-bottom: 3rem;
}

.close-offcanvasmeu {
    position: absolute;
    top: 5rem;
    right: 10.5rem;
    z-index: 99999;
    padding: 0;
    width: 4.6rem;
    height: 4.6rem;
}

@media only screen and (max-width: 991px) {
    .close-offcanvasmeu {
        top: 1rem;
        right: 2rem;
    }
}


.close-offcanvasmeu .btn-close {
    width: 4.6rem;
    height: 4.6rem;
    padding: 0;
    margin-right: 0;
    margin-left: 0;
    opacity: 1;
}

.close-offcanvasmeu .btn-close:focus {
    outline: none;
    box-shadow: none;
}

.close-offcanvasmeu .btn-close:hover {
    transform: rotate(90deg);

}

.close-sidenav {
    position: absolute;
    top: 5rem;
    right: 10.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 100%;
    padding: 0;
    cursor: pointer;
    z-index: 9;
    transition: transform 0.2s;
}

@media (max-width: 991px) {
    .close-sidenav {
        top: 1rem;
        right: 1rem;
    }
}

.close-sidenav div {
    width: 2rem;
    height: 0.2rem;
    background: var(--grey-dark-one);
}

.close-sidenav div:nth-of-type(1) {
    transform: rotate(45deg);
}

.close-sidenav div:nth-of-type(2) {
    transform: rotate(-45deg) translate(1px, -1px);
}

.close-sidenav:hover {
    transform: rotate(90deg);
}

.side-navigation li a {
    opacity: .5;
}

.side-navigation li a:hover {
    opacity: 1;
}


.side-nav-opened {
    position: relative;
    overflow: hidden;
    padding-right: 17px;
}

@media (max-width: 991px) {
    .side-nav-opened {
        padding-right: 0;
    }
}

.side-nav-opened::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
}

.side-nav-inner {
    height: 100%;
    overflow-x: hidden;
    padding: 5rem 1.5rem;
}

.side-nav-content .axil-contact-info-inner {
    padding: 0.7rem 0 0;
}

/*--Footer--*/
.page-footer {
    padding: 6rem 0;
}

.footer-widget {
    margin-bottom: 3rem;
}

.footer-widget .footer-widget-title {
    font-family: var(--primary-font);
    color: var(--grey-dark-one);
    font-weight: var(--p-semi-bold);
    line-height: 1.4;
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--color-white);
    margin-bottom: 2rem;
}

.footer-widget .footer-nav {
    font-family: var(--secondary-font);
    font-size: 1.5rem;
    line-height: 3rem;
    color: var(--grey-dark-three);
    padding-left: 0;
}

.footer-widget .footer-nav li {
    list-style: none;
}

.footer-mid {
    padding: 3rem 0;
}

.footer-logo {
    max-height: 4rem;
}

.footer-social-share {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.footer-social-share .axil-social-title {
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: var(--p-semi-bold);
    color: var(--color-white);
}

@media (max-width: 767px) {
    .footer-social-share .axil-social-title {
        padding: 2rem 1rem 2rem 0;
    }
}

.footer-social-share .social-share-list-wrapper {
    margin: -1rem;
}

.footer-social-share .social-share-list-wrapper li {
    width: 7.2rem;
    height: 7.2rem;
    padding: 1rem;
}

.footer-social-share .axil-social-title {
    margin-bottom: 0;
    margin-right: 2rem;
}

.footer-social-share .social-share li {
    margin-right: 1rem;
}

.footer-bottom {
    padding-top: 3rem;
    border-top: 0.2rem solid var(--grey-dark-one);
}

.footer-bottom ul,
.footer-bottom .axil-copyright-txt {
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--grey-dark-three);
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}

.footer-bottom ul li,
.footer-bottom .axil-copyright-txt li {
    margin-bottom: 0.5rem;
    margin-right: 1rem;
}

.footer-bottom ul li:not(:nth-of-type(1))::before,
.footer-bottom .axil-copyright-txt li:not(:nth-of-type(1))::before {
    content: " ";
    display: inline-flex;
    width: 0.1rem;
    height: 1rem;
    background-color: var(--grey-dark-three);
    margin-right: 1rem;
}

.footer-bottom .axil-copyright-txt {
    margin-bottom: 0;
}

/*--Plyr--*/
.plyr {
    margin-bottom: 2rem;
}

.plyr video {
    margin-bottom: 0;
}

.plyr--full-ui.plyr--video .plyr__control--overlaid {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 7rem;
    background: #fff;
    color: var(--grey-dark-one);
}

.plyr--full-ui.plyr--video .plyr__control--overlaid:hover {
    box-shadow: 0 0 10rem rgba(0, 0, 0, 0.7);
}

.plyr--audio .plyr__controls {
    background-color: var(--primary-color);
}

.plyr__control,
.plyr__time {
    color: #fff;
}

.plyr__volume input[type=range] {
    color: var(--color-yellow-one);
}

.plyr--audio .plyr__control.plyr__tab-focus,
.plyr--audio .plyr__control:hover,
.plyr--audio .plyr__control[aria-expanded=true] {
    background: var(--color-yellow-one);
}

/*--Isotop--*/
.axil-filter-button-group .filter-btn {
    font-size: 1.2rem;
    line-height: 2rem;
    color: var(--grey-dark-one);
    font-weight: var(--p-bold);
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    padding: 0;
    margin: 0 1rem;
}

@media (max-width: 991px) {
    .axil-filter-button-group .filter-btn {
        margin: 0 1rem 1rem 0;
    }

    .axil-filter-button-group .filter-btn:nth-last-of-type(1) {
        margin-right: 0;
    }
}

.axil-filter-button-group .filter-btn::after {
    content: " ";
    position: absolute;
    bottom: -2.1rem;
    left: 0;
    width: 100%;
    height: 0.2rem;
    background-color: var(--primary-color);
    display: block;
    transform: scaleX(0);
    transition: all 0.5s;
}

.axil-filter-button-group .filter-btn:hover,
.axil-filter-button-group .filter-btn.is-checked,
.axil-filter-button-group .filter-btn:focus {
    outline: 0;
}

.axil-filter-button-group .filter-btn:hover::after,
.axil-filter-button-group .filter-btn.is-checked::after,
.axil-filter-button-group .filter-btn:focus::after {
    transform: scaleX(1);
}

@media (max-width: 991px) {
    .section-title .axil-filter-button-group {
        order: 3;
        margin-top: 2rem;
    }

    .section-title .axil-filter-button-group .filter-btn::after {
        bottom: -0.5rem;
    }
}

.axil-iso-grid {
    transition: height 0.5s;
}

.iso-grid-item {
    margin-bottom: 3rem;
}

.iso-grid-item .post-block {
    margin-bottom: 0;
}

.axil-img-container {
    position: relative;
    overflow: hidden;
}

.axil-img-container.flex-height-container {
    height: calc(100% - 3rem);
}

@media (max-width: 991px) {
    .axil-img-container.flex-height-container {
        height: auto;
        margin-bottom: 3rem;
    }

    .axil-img-container.flex-height-container img {
        min-height: 25rem;
        object-fit: cover;
    }
}

.axil-img-container.flex-height-container img {
    height: 100%;
    object-fit: cover;
}

.axil-img-container.flex-height-container .media-body {
    height: 100%;
}

.axil-img-container.flex-height-container__forced {
    height: calc(100% - 9rem);
}

.axil-img-container.flex-height-container__forced img {
    height: 100%;
    object-fit: cover;
}

.axil-img-container.flex-height-container__forced .media {
    height: 100%;
}

.axil-img-container img {
    width: 100%;
    transition: all 0.5s;
    object-fit: cover;
}

.axil-img-container:hover a img {
    transform: scale(1.1);
}

.axil-img-container>a .grad-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.axil-img-container .media {
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 0 !important;
}

.axil-img-container .media-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem;
}

.axil-img-container .media-body .axil-post-title {
    color: #fff;
}

@media (max-width: 991px) {
    .axil-img-container .media-body .axil-post-title {
        font-size: 1.6rem;
        line-height: 2.6rem;
    }
}

.axil-img-container .media-body__big {
    padding: 5rem;
    justify-content: flex-end;
}

@media (max-width: 991px) {
    .axil-img-container .media-body__big {
        padding: 3rem;
    }
}

.axil-img-container .media-body__big .axil-post-title {
    font-size: 2.8rem;
    line-height: 1.4;
}

@media (max-width: 991px) {
    .axil-img-container .media-body__big .axil-post-title {
        font-size: 1.8rem;
        line-height: 2.8rem;
    }
}

.axil-img-container .post-metas ul {
    color: var(--grey-light-one);
}

.axil-img-container .post-metas img {
    max-width: 4rem;
    margin-right: 1rem !important;
}

@media (max-width: 767px) {
    .axil-img-container .post-metas img {
        margin: 0 1rem 0 0 !important;
    }
}

.axil-img-container .video-play-btn {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@media (max-width: 991px) {
    .axil-img-container .video-play-btn {
        top: 3rem;
        left: 3rem;
        width: 5rem;
        height: 5rem;
        transform: none;
    }
}

.axil-img-container.video-container__type-2 .video-play-btn {
    top: 5rem;
    left: 5rem;
    transform: none;
}

@media (max-width: 991px) {
    .axil-img-container.video-container__type-2 .video-play-btn {
        top: 3rem;
        left: 3rem;
    }
}

.axil-img-container:hover .hover-line a {
    background-size: 100% 2px;
}

/*--Team--*/
.axil-team-block {
    display: block;
    position: relative;
}

.axil-team-block .axil-team-inner {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
}

.axil-team-block .axil-team-inner .axil-team-inner-content {
    width: 100%;
    align-self: flex-end;
}

.axil-team-block img {
    width: 100%;
}

.axil-team-block .axil-team-inner-content {
    color: #fff;
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
}

.axil-team-block .axil-member-title {
    font-size: 2.4rem;
    line-height: 3rem;
    color: #fff;
    margin-bottom: 0;
}

.axil-team-block .axil-designation {
    font-family: var(--secondary-font);
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: #eae7e7;
    margin-top: 0.5rem;
}

.axil-team-share-wrapper {
    position: absolute;
    top: 3rem;
    left: 3rem;
}

.axil-team-share-wrapper .social-share__vertical li {
    transform: translateX(-100%);
    transition: all 0.5s;
}

.axil-team-block:hover .social-share__vertical li {
    transform: translateX(0);
}

.axil-team-block:hover .hover-line a {
    background-size: 100% 2px;
}

.axil-position-title {
    font-size: 2.4rem;
    line-height: 3.6rem;
    font-weight: var(--p-regular);
}

.axil-position-block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    margin-bottom: 3rem;
    border-bottom: 0.1rem solid var(--grey-light-one);
}

.axil-position-block .axil-position-title {
    margin-bottom: 0;
}

@media (max-width: 991px) {
    .axil-position-block {
        display: block;
    }

    .axil-position-block .axil-position-title {
        font-size: 1.8rem;
        line-height: 3rem;
        margin-bottom: 1rem;
    }
}

.axil-team-block .img-container {
    position: relative;
}

.axil-team-block .img-container::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(18, 18, 19, 0) 0%, rgba(18, 18, 19, 0.7) 100%);
}

.join-us {
    margin-top: -1.4rem;
}

/*--Contacts--*/
.axil-map-wrapper {
    height: 55rem;
    overflow: hidden;
}

.axil-map-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
}

@media (max-width: 991px) {
    .axil-map-wrapper {
        height: 30rem;
    }
}

.axil-contact-form-block,
.axil-contact-info-inner {
    background: #fff;
    padding: 5rem;
}

@media (max-width: 991px) {

    .axil-contact-form-block,
    .axil-contact-info-inner {
        padding: 4rem 2rem;
    }
}

address .tel {
    font-family: var(--secondary-font);
    display: block;
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: var(--grey-dark-two);
    margin-bottom: 1.5rem;
    position: relative;
    display: inline;
    background-image: linear-gradient(to right, currentColor 0%, currentColor 100%);
    background-size: 0px 2px;
    background-position: 0px 95%;
    transition: background-size 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
    padding: 0.1% 0px;
    background-repeat: no-repeat;
    color: inherit;
    background-position: 0 100%;
    margin-left: 2.2rem;
}

address .tel:hover {
    background-size: 100% 2px;
}

address .tel i {
    position: absolute;
    top: 3px;
    left: -2.2rem;
    font-size: 1.4rem;
}

@media (max-width: 991px) {
    address .tel {
        font-size: 1.4rem;
        line-height: 2.4rem;
    }

    address .tel i {
        font-size: 1.2rem;
    }
}

.contact-social-share {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.contact-social-share .axil-social-title {
    margin-bottom: 0;
    margin-right: 2rem;
}

.contact-social-share .social-share li {
    margin-right: 1rem;
}

/*--Error 404--*/
.error-404-banner {
    padding: 16rem 0;
}

@media (max-width: 991px) {
    .error-404-banner {
        padding: 20rem 0;
    }
}

@media (max-width: 767px) {
    .error-404-banner {
        padding: 6rem 0;
    }
}

.error-404-content {
    position: relative;
}

.error-404-content .txt-404 {
    position: relative;
    font-size: 47rem;
    line-height: 1;
    color: #fff;
    font-weight: var(--p-bold);
    z-index: 1;
}

.error-404-content .error-inner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 100%;
}

@media (max-width: 991px) {
    .error-404-content .txt-404 {
        font-size: 30rem;
    }
}

@media (max-width: 767px) {
    .error-404-content .txt-404 {
        font-size: 12rem;
        margin-bottom: 1rem;
    }

    .error-404-content .error-inner-content {
        position: static;
        transform: none;
    }
}

/*--Under construction--*/
.under-construction-inner-content {
    height: 100vh;
    padding: 10rem 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
}

.under-construction-inner-content .brand-logo-container {
    margin-bottom: 4rem;
}

.under-construction-inner-content .brand-logo-container a {
    display: inline-block;
}

.under-construction-inner-content .brand-logo-container .brand-logo {
    max-width: 25rem;
    max-height: 4.5rem;
    height: 4.5rem;
}

.under-construction-inner-content .axil-title {
    margin-bottom: 4rem;
}

.under-construction-inner-content .newsletter-content {
    margin: 0;
}

.under-construction-inner-content .newsletter-content .form-group {
    width: 25rem;
}

.under-construction-inner-content .btn {
    margin-left: 2rem;
}

@media (max-width: 1199px) {
    .under-construction-inner-content {
        height: calc(100vh - 7rem);
        padding: 10vw;
        background: #fff;
    }

    .under-construction-inner-content .brand-logo {
        max-height: 5rem;
        max-width: 18rem;
    }
}

@media (max-width: 767px) {
    .under-construction-inner-content {
        height: calc(100vh - 3rem);
        padding: 8vw;
        background: #fff;
    }

    .under-construction-inner-content .brand-logo-container {
        margin-bottom: 3rem;
    }

    .under-construction-inner-content .brand-logo {
        max-height: 5rem;
        max-width: 18rem;
    }

    .under-construction-inner-content .axil-title {
        margin-bottom: 2rem;
    }

    .under-construction-inner-content h1 {
        font-size: 2.4rem;
    }

    .under-construction-inner-content .btn {
        margin-left: 0;
    }
}

@media (max-width: 1199px) {
    .under-construction-banner {
        padding: 3.5rem 0;
    }
}

@media (max-width: 767px) {
    .under-construction-banner {
        padding: 1.5rem 0;
    }
}

/*--Author details--*/
.author-details-block {
    position: relative;
    padding: 3rem;
    background: var(--color-white);
}

.author-details-block .author-social-share {
    position: absolute;
    top: 3rem;
    right: 2rem;
}

@media (max-width: 991px) {
    .author-details-block .author-social-share {
        position: static;
        margin-top: 2rem;
    }
}

.author-social-share .social-share__with-bg li {
    margin-right: 1rem;
}

/*--Subscribe popup--*/
.subscribe-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s;
}

.subscribe-popup.show-popup {
    opacity: 1;
    visibility: visible;
}

.subscribe-popup .section-title {
    display: block;
}

.subscribe-popup .subscribe-popup-inner {
    position: relative;
    width: 100%;
    max-width: 78rem;
}

@media (max-width: 991px) {
    .subscribe-popup .subscribe-popup-inner {
        max-width: 60rem;
    }
}

@media (max-width: 767px) {
    .subscribe-popup .subscribe-popup-inner {
        max-width: 28rem;
    }
}

.subscribe-popup .subscribe-popup-inner .img-container {
    height: 100%;
}

@media (max-width: 991px) {
    .subscribe-popup .subscribe-popup-inner .img-container {
        display: none;
    }
}

.subscribe-popup .subscribe-popup-inner .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.subscribe-popup .subscribe-popup-inner .close-popup {
    position: absolute;
    top: 0.8rem;
    right: 1rem;
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    z-index: 9;
    transition: all 0.5s;
}

.subscribe-popup .subscribe-popup-inner .close-popup:hover {
    color: var(--primary-color);
}

.subscribe-popup .weekly-newsletter {
    height: 100%;
    align-items: center;
    display: flex;
}

/*--Widgets--*/
.widget-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid var(--grey-light-one);
}

.widget-title h3 {
    font-size: 1.8rem;
    line-height: 3rem;
    margin-bottom: 0;
}

/*--Category widget--*/
.category-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: -0.5rem;
    list-style: none;
}

.category-list-wrapper li {
    width: 50%;
    height: 20rem;
    padding: 0.5rem;
}

@media (max-width: 767px) {
    .category-list-wrapper li {
        height: 15rem;
    }
}

.category-list-wrapper li .list-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    background-size: 100%;
    background-position: center center;
    overflow: hidden;
    transition: all 0.2s;
}

.category-list-wrapper li .list-inner:hover {
    background-size: 110%;
}

.category-list-wrapper li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.post-info-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.post-info-wrapper .counter-inner {
    font-size: 2.4rem;
    line-height: 3.6rem;
    font-weight: var(--p-bold);
    color: #fff;
}

.post-info-wrapper .cat-title {
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: var(--grey-light-one);
    margin: 0;
}

.category-widget .owl-nav {
    margin-left: auto;
}

.category-widget .owl-nav button {
    background: transparent;
    border: none;
    cursor: pointer;
}

.category-widget .owl-nav button.owl-prev,
.category-widget .owl-nav button.owl-next,
.category-widget .owl-nav button.custom-owl-prev,
.category-widget .owl-nav button.custom-owl-next {
    width: 3rem;
    height: 3rem;
    text-align: center;
    border-radius: 0;
    padding: 0;
    transition: all 0.5s;
    background-color: var(--grey-light-one);
}

.category-widget .owl-nav button.owl-prev i,
.category-widget .owl-nav button.owl-next i,
.category-widget .owl-nav button.custom-owl-prev i,
.category-widget .owl-nav button.custom-owl-next i {
    font-size: 1.4rem;
    line-height: 3rem;
    color: #fff;
    transition: all 0.5s;
}

.category-widget .owl-nav button.owl-prev:hover,
.category-widget .owl-nav button.owl-next:hover,
.category-widget .owl-nav button.custom-owl-prev:hover,
.category-widget .owl-nav button.custom-owl-next:hover {
    background-color: var(--primary-color);
}

.category-widget .owl-nav button.custom-owl-next {
    margin-left: 0.8rem;
}

/*--Sidebar social share--*/
.social-share-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: -0.5rem;
}

.social-share-list-wrapper li {
    width: 25%;
    height: 10rem;
    padding: 0.5rem;
    color: #fff;
}

.social-share-list-wrapper li .list-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: all 0.2s;
}

.social-share-list-wrapper li .list-inner:hover {
    color: inherit;
    transform: translateY(-2px);
}

.social-share-list-wrapper li i {
    font-size: 1.8rem;
}

.social-share-list-wrapper li .counts {
    font-size: 1.4rem;
    line-height: 2.2rem;
    font-weight: var(--p-bold);
}

.social-share-list-wrapper li .title {
    font-family: var(--secondary-font);
    font-size: 1rem;
    line-height: 1.3rem;
}

/*--Sidebar post--*/
.tab-pane {
    transform: translateY(2rem);
    transition: all 0.3s ease-in-out;
}

.tab-pane.show {
    transform: translateY(0);
}

.sidebar-post-widget .nav-pills {
    border: 0 solid var(--grey-light-one);
    border-width: 0 0 0.1rem 0.1rem;
    margin-bottom: 2rem;
}

.sidebar-post-widget .nav-pills .nav-item {
    display: block;
    margin-bottom: 0;
    text-transform: none;
}

.sidebar-post-widget .nav-pills .nav-item a {
    font-family: var(--secondary-font);
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: var(--grey-mid);
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: var(--s-bold);
    text-align: center;
    padding: 1.3rem 1rem;
    border: 0 solid var(--grey-light-one);
    border-width: 0.1rem 0.1rem 0 0;
    border-radius: 0;
}

.sidebar-post-widget .nav-pills .nav-item a:hover,
.sidebar-post-widget .nav-pills .nav-item a.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
}

/*--Instagram post--*/
.instagram-post-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: -0.5rem;
    list-style: none;
}

.instagram-post-list-wrapper li {
    width: 50%;
    height: 20rem;
    padding: 0.5rem;
}

@media (max-width: 767px) {
    .instagram-post-list-wrapper li {
        height: 15rem;
    }
}

.instagram-post-list-wrapper li .list-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    background-size: 100%;
    background-position: center center;
    overflow: hidden;
    transition: all 0.2s;
}

.instagram-post-list-wrapper li .list-inner:hover {
    background-size: 110%;
}

.instagram-post-list-wrapper li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.instagram-post-list-wrapper li {
    width: 33.333333%;
    height: 12rem;
}

.instagram-post-list-wrapper li .post-info-wrapper {
    transform: translateY(101%);
    transition: all 0.3s;
}

.instagram-post-list-wrapper li .list-inner:hover .post-info-wrapper {
    transform: translateY(0);
}

.instagram-post-list-wrapper .post-info {
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: #fff;
    font-weight: var(--p-medium);
}

.instagram-post-list-wrapper .post-info i {
    font-size: 1.2rem;
    margin-right: 0.4rem;
}

/*--Add widget--*/
.add-block-widget .overlay {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 22.5rem 1.5rem;
    height: 100%;
    background: linear-gradient(180deg, rgba(18, 18, 19, 0) 0%, #121213 100%);
}

.add-block-widget .add-title {
    font-size: 2.4rem;
    line-height: 3.6rem;
    color: #fff;
    font-weight: var(--p-bold);
}

/*--Tag widget--*/
.tag-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.tag-list-wrapper li {
    margin: 0 1rem 1rem 0;
}

.tag-list-wrapper li a {
    display: block;
    font-family: var(--secondary-font);
    font-size: 1.4rem;
    line-height: 2rem;
    color: var(--grey-dark-four);
    font-weight: var(--s-medium);
    padding: 0.6rem 1.3rem;
    border: 0.2rem solid var(--grey-light-one);
}

.tag-list-wrapper li a:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
}

/*--Media queries--*/
@media screen and (min-width: 0 \0) {
    .axil-latest-post .post-block {
        display: block;
    }

    .subscribe-popup .section-title {
        display: block;
    }

    .bg-grey-dark-one .hover-line a,
    .media-caption .hover-line a,
    .axil-img-container .hover-line a,
    .banner-home__with-post .banner-left-content .hover-line a {
        color: var(--color-white);
        background-image: linear-gradient(to right, var(--color-white) 0%, var(--color-white) 100%);
    }

    .hover-line a {
        color: var(--grey-dark-one);
    }

    .video-container__type-2 .axil-img-container .media-body {
        display: block !important;
    }

    .axil-img-container.flex-height-container .media-body {
        display: block !important;
        position: absolute;
        left: 0;
        top: 440px;
    }

    .axil-banner-cat-counter .axil-content::before {
        content: "";
        background: url(../../public/images/others/ie-blur-shadow.png);
        background-size: 100% 100%;
        background-position: center center;
        bottom: -5rem;
    }
}


/* Slick Slide Default Style */

.slick-slider {
    position: relative;
    display: block;
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
}

.slick-slider .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    padding: 0;
    transform: translate3d(0, 0, 0);
}

.slick-slider .slick-track {
    transform: translate3d(0, 0, 0);
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.slick-slider .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
}

.slick-initialized .slick-slide {
    display: block;
    margin-bottom: 0;
}

.post-block img {
    object-fit: cover;
}

.axil-post-carousel .slick-arrow i {
    width: 5rem;
    height: 5rem;
    background: #fff;
    display: block;
    line-height: 5rem;
    text-align: center;
    transition: all 0.5s;
}

.axil-post-carousel .slick-arrow {
    border: none;
    background-color: transparent;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
}

.axil-post-carousel .slick-arrow.slick-next {
    left: auto;
    right: 0;
}

.axil-post-carousel .slick-arrow.slick-prev {
    left: 0;
    right: auto;
}


/* New Css Style  */

.brand-logo-container a span {
    display: block !important;
}

.lang-dropdown .txt-btn {
    background: transparent;
}

.show.lang-dropdown>.dropdown-toggle.txt-btn,
.lang-dropdown .txt-btn:focus {
    background-color: transparent;
    border-color: transparent;
    color: var(--grey-dark-one);
}

.slick-vertical .slick-slide {
    height: auto;
}


.about-us-content h2 {
    font-size: 3.2rem;
    line-height: 4.2rem;
}

@media only screen and (min-width: 1200px) {
    .about-us-content h4 {
        margin-top: 40px;

    }
}

.axil-team-block .img-container span {
    display: block !important;
}

.home-banner-post-metas a img {
    border-radius: 50%;
}

.banner__single-post .post-main-thumbnail img {
    object-fit: cover;
    object-position: center;
}

.single-blog-wrapper .masonry-grid {
    margin: 0;
    padding-bottom: 30px;
}

.single-blog-wrapper .grid-item {
    padding: 0;
}

.header-top__style-two .brand-logo-container a {
    display: inline-block;
}

.main-nav-wrapper::-webkit-scrollbar {
    width: 3px;
}

.main-nav-wrapper::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.main-nav-wrapper::-webkit-scrollbar-thumb {
    background-color: white;
    outline: 1px solid white;
    border-radius: 10px;
    width: 3px;
}

.axil-img-container a span {
    display: block !important;
}

.about-author a img {
    border-radius: 50%;
}

.post-shares li a.bg-color-twitch:hover {
    background-color: var(--color-twitch);
    border-color: var(--color-twitch);
}

.post-shares li a.bg-color-facebook:hover {
    background-color: var(--color-facebook);
    border-color: var(--color-facebook);
}

.post-shares li a.bg-color-twitter:hover {
    background-color: var(--color-twitter);
    border-color: var(--color-twitter);
}

.post-shares li a.bg-color-linkedin:hover {
    background-color: var(--color-linkedin);
    border-color: var(--color-linkedin);
}

.btn.bg-grey-dark-one:hover {
    background-color: var(--grey-dark-one);
    border-color: var(--grey-dark-one);
}


/* Splash Page Style  */

/***** NIKOLA ADDING ******/

/* Category tag color */
.vest-tag-bg-color {
    background-color: red;
}

.intervju-tag-bg-color {
    background-color: green;
}

.recenzija-tag-bg-color {
    background-color: yellow;
}

.section-title .axil-title {
    border-bottom: solid 3px red;
}

.predstava-single-section-wrapper {
    margin-bottom: 20px;
}

.predstava-single-plakat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 3rem;
    line-height: 4.2rem;
    color: #fff;
    font-weight: var(--p-bold);
    /* max-width: 18rem; */
}

.predstava-komentar-info {
    font-size: 1.8rem;
    margin-bottom: 8px;
}

.predstava-komentar-info span {
    font-size: 1.5rem;

}

.predstava-single-zanr {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    border-radius: 25px;
    color: var(--primary-color);
    padding: 5px 10px;
    font-size: 0.8em;

}

.zanr-button {
    border: 1px solid;
    background-color: transparent;
    border-radius: 25px;
    padding: 5px 10px;
    text-transform: lowercase;
}

.current-rating {
    font-size: 18px;
}

.list-inline {
    font-family: var(--primary-font);
}

.search-navbar-result {
    height: 30px;
    position: relative;
    /* top: 87px; */
    width: 100%;
    left: 0;
    background: aqua;
    margin: 0 auto;
    z-index: 111111111;
}

.hup-spinner {
    top: 40%;
    position: sticky;
    left: 49%;
    z-index: 999;
    height: 4rem;
    width: 4rem;
}

.swiper-slide {
    width: 200px !important;
}

.swiper-button-prev,
.swiper-button-next {
    color: #fff !important;
    background-color: var(--primary-color);
}

.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 24px !important;
}

.predstave-naslovna-card {
    width: 200px;
    height: 435px;
    --scale: calc(100vw / 1920);
    transform: scale(var(--scale));
    transform-origin: top;
}

.predstave-naslovna-card-img {
    height: 277px !important;
    width: 100%;
    object-fit: cover;
}

.predstave-naslovna-card-title {
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 54px;
}

.predstave-naslovna-card-title h5 {
    font-size: 1.7rem;
    margin-bottom: 8px;
}

.predstave-naslovna-card-text {
    font-size: 1.3rem;
    line-height: 2.2rem;
}

.hupkast-naslovna-wrapper {
    align-items: flex-start;
    display: flex;
    text-align: start;
    margin-bottom: 20px;
}

.hupkast-naslovna-photo {
    align-self: flex-start;
    position: relative;
    display: inline-block;
    width: 180px;
    text-align: start;
    margin-right: 30px;
}


.hupkast-naslovna-info {
    position: relative;
    flex-basis: 0%;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: start;
    text-size-adjust: 100%;
}

.hupkast-naslovna-info p {
    font-size: 1.5rem;
    line-height: 1.9rem;
}

@media only screen and (max-width: 767px) {
    .hupkast-naslovna-wrapper {
        display: block;
    }

    .hupkast-naslovna-photo {
        width: 100%;
    }

    .hupkast-naslovna-photo .video-play-big {
        width: 100px;
        height: 100px;
        opacity: 0.9;
    }

    .hupkast-naslovna-photo .video-play-btn ::after {
        width: 30px;
        height: 30px;
    }

    .hupkast-naslovna-title h3 {
        font-size: 24px;
    }
}

.autor-pozicija {
    color: var(--grey-dark-four);
}

.izvodjenje-wrapper {
    height: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    min-height: 140px;
    display: flex;
    align-items: center;
    background-color: var(--grey-light-three);
    border-radius: 5%;
    margin-left: 5px;
    margin-right: 5px;
}

.izvodjenje-datum {
    font-size: 2.8rem;
}

@media (max-width: 767px) {
    .izvodjenje-datum {
        font-size: 2.6rem;
        line-height: 1.3;
    }

    .izvodjenje-predstava {
        font-size: 1.1em;
        text-align: left;
    }
}

.izvodjenje-predstava {
    font-size: 1.1em;
}

.izvodjenje-vreme {
    font-size: 0.9em;
}

.izvodjenje-plakat {
    display: grid;
    justify-content: right;
}

.izvodjenje-pozoriste {
    font-size: 0.9em;
}

.izvodjenje-scena {
    color: var()
}

.predstava-index-wrapper {
    align-items: center;
}

.predstava-index-title a {
    font-size: 2rem;
}

.pozorista-layout-wrapper {
    max-width: 150px;
    margin: 10px;
}

.pozorista-layout-logo {
    margin: auto;
}

.pozorista-layout-info {
    text-align: center;
}

.festival-index-wrapper {
    align-items: center;
}

.predstava-recenzija-wrapper {
    padding: 30px;
}

.repertoari-wrapper {
    padding-left: 10px;
    padding-right: 10px;
    height: 1500px;
    overflow-y: scroll;
}

.premijere-naziv-pozorista {
    font-size: 1.3rem;
    margin-bottom: 5px;
}

/* .hupikon-index-title {
    height: 80px;
    margin-bottom: 25px;
}
*/
.hupikon-index-title h3 {
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical;
}

`