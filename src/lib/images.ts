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
    whySISMCard: `${basePath}/assets/whySISsection/Hero_img.jpg`,
    whySISCard1: `${basePath}/assets/whySISsection/cardImg1.jpg`,
    whySISCard2: `${basePath}/assets/whySISsection/cardImg2.jpg`,
    whySISCard3: `${basePath}/assets/whySISsection/cardImg3.jpg`,
    whySISCard4: `${basePath}/assets/whySISsection/cardImg4.jpg`,

    //WorkforceReadinessSection
    HERO_IMG: `${basePath}/assets/WorkforceReadiness/HERO_IMG.jpg`,
    MODULE_IMG: `${basePath}/assets/WorkforceReadiness/MODULE_IMG.jpg`,
    DEPLOY_IMG: `${basePath}/assets/WorkforceReadiness/DEPLOY_IMG.jpg`,

    //impact section
    impactImg: `${basePath}/assets/impactSection/impactImg.jpg`,
  },
  banners: {
    hero: `${basePath}/assets/hero.mp4`,
    employer: `${basePath}/assets/employer-banner.png`,
  },

  sisglobal: {
    IMG_HERO: `${basePath}/assets/sis-global/hero_img.jpg`,
    IMG_WHO_WE_ARE: `${basePath}/assets/sis-global/who_we_are.jpg`,
    IMG_VISION: `${basePath}/assets/sis-global/img_vision.jpg`,
    IMG_MISSION: `${basePath}/assets/sis-global/img_mission.jpg`,
  },

  countries: {
    europe: `${basePath}/assets/countries/europe.jpg`,
    gcc: `${basePath}/assets/countries/gcc.jpg`,
    india: `${basePath}/assets/countries/ram-mandir.png`,
    nepal: `${basePath}/assets/countries/nepal.jpg`,
    sriLanka: `${basePath}/assets/countries/sri-lanka.avif`,
  },

  industries: {
    bgbanner: `${basePath}/assets/industries_bg.png`,
    healthcare: `${basePath}/assets/industries/healthcare.jpg`,
    hospitality: `${basePath}/assets/industries/hospitality.jpg`,
    oil_gas: `${basePath}/assets/industries/oil-gas.jpg`,
    logistics: `${basePath}/assets/industries/logistics.jpg`,
    engineering_mep: `${basePath}/assets/industries/engineering-mep.jpg`,
    it_technology: `${basePath}/assets/industries/it-technology.jpg`,
  },

  contact:{
    banner: `${basePath}/assets/contact/contactBanner.avif`
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
