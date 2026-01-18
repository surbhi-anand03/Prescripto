import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
  // ---------- Bhubaneswar ----------
  {
    _id: 'doc1',
    name: 'Dr. Sandeep Mishra',
    image: doc1,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '8 Years',
    about: 'Dr. Sandeep Mishra provides comprehensive primary healthcare with a focus on preventive medicine and lifestyle management.He emphasizes early diagnosis, patient education, and personalized treatment plans.With a compassionate approach, he strives to improve long-term health outcomes and overall well-being.',
    fees: 500,
    address: {
      line1: 'Jayadev Vihar',
      line2: 'Bhubaneswar, Odisha'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Priyanka Nayak',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '6 Years',
    about: 'Dr. Priyanka Nayak specializes in women’s health, pregnancy care, and gynecological treatments.She emphasizes preventive care, accurate diagnosis, and personalized treatment plans. With a compassionate approach, she supports women’s health and well-being at every stage of life.',
    fees: 700,
    address: {
      line1: 'Patia',
      line2: 'Bhubaneswar, Odisha'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Rakesh Panda',
    image: doc3,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, MD',
    experience: '4 Years',
    about: 'Dr. Rakesh Panda offers advanced dermatology solutions for skin, hair, and cosmetic concerns.He specializes in treating acne, pigmentation, hair loss, and chronic skin conditions.With a focus on modern techniques, he provides safe and effective cosmetic procedures.His patient-centric approach ensures personalized care and long-lasting skin health.',
    fees: 400,
    address: {
      line1: 'Kharavel Nagar',
      line2: 'Bhubaneswar, Odisha'
    }
  },

  // ---------- Other Districts ----------
  {
    _id: 'doc4',
    name: 'Dr. Amit Rout',
    image: doc4,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, MD',
    experience: '5 Years',
    about: 'Dr. Amit Rout is dedicated to child healthcare and preventive pediatric treatments.  He focuses on early diagnosis, growth monitoring, and immunization programs.  With a caring and friendly approach, he ensures the healthy development and well-being of children.',
    fees: 450,
    address: {
      line1: 'College Square',
      line2: 'Cuttack, Odisha'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Sunita Mohanty',
    image: doc5,
    speciality: 'Gynecologist', 
    degree: 'MBBS, MD',
    experience: '9 Years',
    about: 'Dr. Sunita Mohanty provides compassionate maternity and women’s healthcare services.She specializes in pregnancy care, gynecological treatments, and preventive health.With a patient-centered approach, she supports women’s well-being at every stage of life.', 
    fees: 900,
    address: { 
      line1: 'Ainthapali',
      line2: 'Sambalpur, Odisha'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Nilesh Behera', 
    image: doc6,
    speciality: 'Neurologist',
    degree: 'MBBS, MS',
    experience: '7 Years',
    about: 'Dr. Nilesh Behera specializes in neurological disorders with modern diagnostic techniques.He focuses on accurate evaluation, early intervention, and advanced treatment plans.With a patient-focused approach, he aims to improve neurological health and quality of life.',
    fees: 650,
    address: {
      line1: 'Medical Road',
      line2: 'Berhampur, Odisha'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Debashish Sahu',
    image: doc7,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '6 Years',
    about: 'Dr. Debashish Sahu focuses on early diagnosis and long-term wellness for patients.He emphasizes preventive care, accurate assessments, and personalized treatment plans.With a holistic and patient-centered approach, he aims to improve overall health and quality of life.',
    fees: 450,
    address: {
      line1: 'Station Bazar',
      line2: 'Balasore, Odisha'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Aman Khan', 
    image: doc8,
    speciality: 'Dermatologist', 
    degree: 'MBBS, MS',
    experience: '8 Years',
    about: 'Dr. Aman Khan provides personalized dermatology solutions for skin and hair concerns.He specializes in treating acne, hair fall, pigmentation, and chronic skin conditions.With a modern and patient-focused approach, he ensures effective treatments and lasting results.',
    fees: 750,
    address: {
      line1: 'Baner',
      line2: 'Pune, Maharashtra'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Sukanya Anand',
    image: doc9,
    speciality: 'Pediatricians',
    degree: 'MBBS, MS',
    experience: '10 Years',
    about: 'Dr. Sukanya Anand offers expert care in women’s reproductive health and maternity services.She focuses on comprehensive pregnancy care, gynecological treatments, and preventive health.With a compassionate and patient-centered approach, she supports women’s well-being at every stage of life.',
    fees: 900,
    address: { 
      line1: 'A.P. Colony',
      line2: 'Gaya, Bihar'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Nitin Joshi',
    image: doc10,
    speciality: 'Pediatricians',
    degree: 'MBBS, MD',
    experience: '6 Years',
    about: 'Dr. Nitin Joshi ensures quality pediatric care with a friendly and supportive approach.He focuses on child growth, immunizations, and preventive healthcare.With compassionate care, he supports the healthy development and well-being of children.',
    fees: 500,
    address: {
      line1: 'Maninagar',
      line2: 'Ahmedabad, Gujarat'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Shalini Rao',
    image: doc11,
    speciality: 'Neurologist',
    degree: 'MBBS, MD',
    experience: '10 Years',
    about: 'Dr. Shalini Rao is highly experienced in managing chronic neurological disorders.She focuses on accurate diagnosis, long-term treatment, and patient education.With a compassionate and structured approach, she helps patients maintain a better quality of life.',
    fees: 1000,
    address: {
      line1: 'Banjara Hills',
      line2: 'Hyderabad, Telangana'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Vikram Choudhary',
    image: doc12,
    speciality: 'Neurologist',
    degree: 'MBBS, MD',
    experience: '8 Years',
    about: 'Dr. Vikram Choudhary delivers advanced neurological care with a patient-first approach.He specializes in diagnosing and treating complex neurological conditions using modern techniques.With a compassionate and personalized approach, he aims to improve patients’ brain and nervous system health for a better quality of life.',
    fees: 900,
    address: {
      line1: 'Vaishali Nagar',
      line2: 'Jaipur, Rajasthan'
    }
  },
  {
    _id: 'doc13',
    name: 'Dr. Sunita Nair',
    image: doc13,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '9 Years',
    about: 'Dr. Sunita Nair focuses on long-term wellness and preventive healthcare.She emphasizes early detection, lifestyle management, and personalized treatment plans.With a compassionate approach, she guides patients toward better health and sustained well-being.',
    fees: 500,
    address: {
      line1: 'Kakkanad',
      line2: 'Kochi, Kerala'
    }
  },
  {
    _id: 'doc14',
    name: 'Dr. Rahul Bansal',
    image: doc14,
    speciality: 'Dermatologist',
    degree: 'MBBS, MS',
    experience: '7 Years',
    about: 'Dr. Rahul Bansal specializes in clinical and cosmetic dermatology.He provides advanced treatments for skin, hair, and nail conditions, as well as aesthetic enhancements.With a patient-focused approach, he ensures personalized care for healthy and radiant skin.',
    fees: 700,
    address: {
      line1: 'Aliganj',
      line2: 'Lucknow, Uttar Pradesh'
    }
  },
  {
    _id: 'doc15',
    name: 'Dr. Ayesha Siddiqui', 
    image: doc15,
    speciality: 'Gynecologist', 
    degree: 'MBBS, MD',
    experience: '8 Years',
    about: 'Dr. Ayesha Siddiqui provides compassionate gynecological and maternity care.She specializes in pregnancy management, reproductive health, and preventive women’s healthcare.With a patient-centered approach, she ensures comfort, safety, and holistic well-being at every stage.', 
    fees: 850,
    address: {
      line1: 'Rajouri Garden',
      line2: 'New Delhi'
    }
  }
];