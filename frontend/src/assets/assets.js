import arrow_icon from './arrow_icon.svg'
import barber1 from './barber1.png'
import barber3 from './barber3.png'
import chats_icon from './chats_icon.svg'
import cosmetology1 from './cosmetolog1.png'
import cosmetology2 from './cosmetolog2.png'
import appointment_img from './create_account.png'
import cross_icon from './cross_icon.png'
import dropdown_icon from './dropdown_icon.svg'
import group_profiles from './group_profiles.png'
import hairdresser2 from './hairdresser2.png'
import hairdresser3 from './hairdresser3.png'
import header_img from './header_img.png'
import info_icon from './info_icon.svg'
import logo from './logo.svg'
import menu_icon from './menu_icon.svg'
import nailsmaster1 from './nailsmaster1.png'
import nailsmaster2 from './nailsmaster2.png'
import profile_pic from './profile_pic.png'
import services from './reception.png'
import upload_icon from './upload_icon.png'
import verified_icon from './verified_icon.svg'



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
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon, 
    services,
}

export const specialityData = [
    {
        speciality: 'Hairdresser',
        image: logo
    },
    {
        speciality: 'Nail Master',
        image: logo
    },
    {
        speciality: 'Cosmetologist',
        image: logo
    },
    {
        speciality: 'Barber',
        image: logo
    },
    ]

export const beautySpecialists = [
    {
        _id: 'beautyMaster1',
        name: 'Edward James',
        image: barber1,
        speciality: 'Barber',
        degree: 'Top stylist',
        experience: '15 Years',
        about: 'Best',
        fees: 70,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'barber3',
        name: 'Christopher Lee',
        image: barber3,
        speciality: 'Barber',
        degree: 'Stylist',
        experience: '7 Years',
        about: 'Good',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'hairdresser2',
        name: 'Sarah Patel',
        image: hairdresser2,
        speciality: 'Hairdresser',
        degree: 'Top-stylist',
        experience: '20 Years',
        about: 'Great',
        fees: 80,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'hairdresser3',
        name: 'Emily Larson',
        image: hairdresser3,
        speciality: 'Hairdresser',
        degree: 'Junior',
        experience: '3 Years',
        about: 'Normal',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'nailsmaster1',
        name: 'Jennifer Garcia',
        image: nailsmaster1,
        speciality: 'Nail Master',
        degree: 'Top',
        experience: '9 Years',
        about: 'Perfect',
        fees: 30,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'nailsmaster2',
        name: 'Ava Mitchell',
        image: nailsmaster2,
        speciality: 'Nail Master',
        degree: 'Junior',
        experience: '2 Years',
        about: 'New',
        fees: 20,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cosmetology1',
        name: 'Christopher Davis',
        image: cosmetology1,
        speciality: 'Cosmetologist',
        degree: 'Middle',
        experience: '13 Years',
        about: 'Best',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'cosmetology2',
        name: 'Ava Mitchell',
        image: cosmetology2,
        speciality: 'Cosmetologist',
        degree: 'Doctor',
        experience: '10 Years',
        about: 'injections',
        fees: 120,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]