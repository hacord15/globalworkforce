// src/lib/images.ts

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const images = {
  logos: {
    primary: `${basePath}/assets/LOGO-new-formet.png`,
    secondary: `${basePath}/assets/LOGO-2-gray colour.png`,
    // Client logos
    client1: `${basePath}/assets/client_logo_1.png`,
    client2: `${basePath}/assets/client_logo_2.png`,
    client3: `${basePath}/assets/client_logo_3.png`,
    client4: `${basePath}/assets/client_logo_4.png`,
  },
  homepage: {
    about: `${basePath}/assets/about-banner.png`,

    // Why SIS Section card images
    whySISMCard: `${basePath}/assets/whySISsection/Hero_img.png`,
    whySISCard1: `${basePath}/assets/whySISsection/cardImg1.png`,
    whySISCard2: `${basePath}/assets/whySISsection/cardImg2.png`,
    whySISCard3: `${basePath}/assets/whySISsection/cardImg3.png`,
    whySISCard4: `${basePath}/assets/whySISsection/cardImg4.png`,

    //WorkforceReadinessSection
    HERO_IMG: `${basePath}/assets/WorkforceReadiness/HERO_IMG.png`,
    MODULE_IMG: `${basePath}/assets/WorkforceReadiness/MODULE_IMG.png`,
    DEPLOY_IMG: `${basePath}/assets/WorkforceReadiness/DEPLOY_IMG.png`,

    //impact section
    impactImg: `${basePath}/assets/impactSection/impactImg.png`,
  },
  banners: {
    hero: `${basePath}/assets/hero.mp4`,
    employer: `${basePath}/assets/employer-banner.png`,
  },

  sisglobal: {
    IMG_HERO: `${basePath}/assets/sis-global/hero_img.png`,
    IMG_WHO_WE_ARE: `${basePath}/assets/sis-global/who_we_are.png`,
    IMG_VISION: `${basePath}/assets/sis-global/img_vision.png`,
    IMG_MISSION: `${basePath}/assets/sis-global/img_mission.png`,
  },

  countries: {
    europe: `${basePath}/assets/countries/europe.png`,
    gcc: `${basePath}/assets/countries/gcc.png`,
    india: `${basePath}/assets/countries/india.png`,
    nepal: `${basePath}/assets/countries/nepal.png`,
    sriLanka: `${basePath}/assets/countries/sri-lanka.png`,
  },

  industries: {
    bgbanner: `${basePath}/assets/industries_bg.png`,
    healthcare: `${basePath}/assets/industries/healthcare.png`,
    hospitality: `${basePath}/assets/industries/hospitality.png`,
    oil_gas: `${basePath}/assets/industries/oil-gas.png`,
    logistics: `${basePath}/assets/industries/logistics.png`,
    engineering_mep: `${basePath}/assets/industries/engineering-mep.png`,
    it_technology: `${basePath}/assets/industries/it-technology.png`,
  },

  contact:{
    banner: `${basePath}/assets/contact/contactBanner.png`
  },

  //associate 
  associate:{
    banner:`${basePath}/assets/associate-banner.png`
  },
  employer:{
    banner:`${basePath}/assets/employer-banner.png`
  },
  
  //jobs page
  jobs:{
     hero: `${basePath}/assets/job_banner.png`,
     benifits:`${basePath}assets/job_why_work.png`
  },
 


};
