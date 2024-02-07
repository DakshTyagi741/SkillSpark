import React from 'react'
import HighlightText from './HighlightText';
import knowYourProgress from '../../../assets/Images/Know_your_progress.png';
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png';
import compareWithOthers from '../../../assets/Images/Compare_with_others.png';
import CTAButton from '../../core/HomePage/Button';

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'> 

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife For 
                <HighlightText text={"Learning Any Language"}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex items-center justify-center mt-5'>

                <img src={knowYourProgress}
                alt="knowYourProgress"
                className='object-contain -mr-32'></img>

                <img src={compareWithOthers}
                alt="compareWithOthers"
                className='object-contain '
                ></img>

                <img src={planYourLessons}
                alt="planYourLessons"
                className='object-contain -ml-36'
                ></img>

            </div>

            <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
                <div>
                    Learn More
                </div>
            </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection;