import { FC, useState } from "react"
import { sliderData } from "../../data/data"
import styles from "./Slider.module.scss"


const Slider: FC = () => {
	const [viewData, setViewData] = useState<number[]>([0, 1, 2])
	const [viewDataTab, setViewDataTab] = useState<number[]>([0, 1])
	const [viewDataMobile, setViewDataMobile] = useState<number[]>([0])

	const prevSlide = () => {
		if (window.innerWidth <= 1500 && window.innerWidth > 991.98) {
			setViewDataTab(prevState => {
				const newState = prevState.map((elem: number) => {
					if (elem > 0) {
						return elem - 1
					} else {
						return (elem = sliderData.length - 1)
					}
				})
				return newState
			})
		} else if (window.innerWidth <= 991.98) {
			setViewDataMobile(prevState => {
				const newState = prevState.map((elem: number) => {
					if (elem > 0) {
						return elem - 1
					} else {
						return (elem = sliderData.length - 1)
					}
				})
				return newState
			})
		} else {
			setViewData(prevState => {
				const newState = prevState.map((elem: number) => {
					if (elem > 0) {
						return elem - 1
					} else {
						return (elem = sliderData.length - 1)
					}
				})
				return newState
			})
		}
	}

	const nextSlide = () => {
		if (window.innerWidth <= 1500 && window.innerWidth > 991.98) {
			setViewDataTab(prevState => {
				const newState = prevState.map((elem: number) => {
					if (elem < sliderData.length - 1) {
						return elem + 1
					} else {
						return (elem = 0)
					}
				})
				return newState
			})
		} else if (window.innerWidth <= 991.98) {
			setViewDataMobile(prevState => {
				const newState = prevState.map((elem: number) => {
					if (elem < sliderData.length - 1) {
						return elem + 1
					} else {
						return (elem = 0)
					}
				})
				return newState
			})
		} else {
			setViewData(prevState => {
				const newState = prevState.map((elem: number) => {
					if (elem < sliderData.length - 1) {
						return elem + 1
					} else {
						return (elem = 0)
					}
				})
				return newState
			})
		}
	}

	return (
        <div className={styles.wrapper}>
            <button onClick={prevSlide}>
                <img src='/svg/slider-arrow-tip-left.svg' alt='Стрелка влево' />
            </button>

            <div className={styles['block-advantages']}>
                {window.innerWidth <= 1500 && window.innerWidth > 991.98
                    ? viewDataTab.map((index: number) => {
                        const advant = sliderData[index];
                        return (
                            <div
                                key={advant.id}
                                className={styles['block-advantages__advantage']}
                            >
                                <img src={advant.img} alt='Время' />
                                <p>{advant.description}</p>
                            </div>
                        )
                    })
                    : window.innerWidth <= 991.98
                        ? viewDataMobile.map((index: number) => {
                            const advant = sliderData[index]
                            return (
                                <div
                                    key={advant.id}
                                    className={styles['block-advantages__advantage']}
                                >
                                    <img src={advant.img} alt='Время' />
                                    <p>{advant.description}</p>
                                </div>
                            )
                        })
                        : viewData.map((index: number) => {
                            const advant = sliderData[index];
                            return (
                                <div
                                    key={advant.id}
                                    className={styles['block-advantages__advantage']}
                                >
                                    <img src={advant.img} alt='Время' />
                                    <p>{advant.description}</p>
                                </div>
                            )
                        })}
            </div>
            <button onClick={nextSlide}>
                <img src='/svg/slider-arrow-tip-right.svg' alt='Стрелка вправо' />
            </button>
        </div>
	)
}

export default Slider
