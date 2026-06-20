function backButtonClick() {
	const referrer = document.referrer; 
    const currentDomain = window.location.hostname; 

    if (referrer && referrer.includes(currentDomain)) {
		window.history.back(); 
	} else {
		window.location.href = '/'; 
	}
}


let PIXELS_PER_YEAR = 140;
var firstYear = null;
var breaks = [];

// Animations
const STAGGER_STEP = 50;
const MAX_DELAY = 300;
const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target); // animate once
			}
		});
	},
	{
		threshold: 0.6
	}
);

// Maps years to Y positions
function yearToY(year,offset = 0) {

	let adjustedYear = year;

	breaks.forEach(br => {

		// only affect years AFTER the break
		if (year > br.to) {

			const skippedYears = br.to - br.from;

			adjustedYear -= skippedYears - 1;
		}
	});

	return (adjustedYear - firstYear) * PIXELS_PER_YEAR + offset;
}
function yearToTimelineSlot(year) {
	let adjustedYear = Number(year);

	breaks.forEach(br => {
		if (year > br.to) {
			const skippedYears = br.to - br.from;
			adjustedYear -= skippedYears - 1;
		}
	});

	return adjustedYear;
}

function buildTimeline() {
	const timeline = document.querySelector('.characterTimeline');
	
	breaks = Array.from(document.querySelectorAll('.timeline-break')).map(el => ({
			from: Number(el.dataset.from),
			to: Number(el.dataset.to)
		}));

	const elements = [...document.querySelectorAll('.timeline-item, .timeline-image, .year-marker, .timeline-break')];

	const years = elements.map(el => Number(el.dataset.year || el.dataset.to)).filter(y => !isNaN(y));

	firstYear = Math.min(...years);

	let maxY = 0;

	elements.forEach(el => {

		let year;

		if (el.classList.contains('timeline-break')) {
			year = Number(el.dataset.from);
		} else {
			year = Number(el.dataset.year);
		}
		
		let offset = 0;
		if (el.dataset.offset) {
			offset = Number(el.dataset.offset);
		}
		if (el.classList.contains('year-marker')) {
			offset = -25;
		} 

		let y = yearToY(year,offset);
		
		el.style.top = `${y}px`;

		maxY = Math.max(maxY, y);
	});

	timeline.style.height = `${maxY + 500}px`;

	// Set Animation
	const items = document.querySelectorAll('.timeline-item, .year-marker');
	items.forEach((item, index) => {
		const delay = Math.min(index * STAGGER_STEP, MAX_DELAY);
		item.style.transitionDelay = `${delay}ms`;
		observer.observe(item);
	});
	
}

function positionRanges() {

	const rangeEls = document.querySelectorAll('.timeline-range');

	rangeEls.forEach(range => {

		const startYear = Number(range.dataset.from);
		const endYear = Number(range.dataset.to);
		var inclusiveStart = 'i', inclusiveEnd = 'i';
		
		if (range.dataset.inclusive) {
			inclusiveStart = range.dataset.inclusive[0];
			inclusiveEnd = range.dataset.inclusive[1];
		}
		const top = yearToY(startYear);
		const bottom = yearToY(endYear);
		
		const rangeStartOffsets = {
			i: -6,
			l: 12,
			e: 30
		};

		const rangeEndOffsets = {
			i: 30,
			l: 12,
			e: 0
		};

		const rangeTop = top + rangeStartOffsets[inclusiveStart];
		const rangeBottom = bottom + rangeEndOffsets[inclusiveEnd];

		range.style.top = `${rangeTop}px`;
		range.style.height = `${rangeBottom - rangeTop}px`;
		
	});
}

function adjustForCollisions() {
	const isMobileTimeline = window.innerWidth <= 1000;

	const YEAR_GAP_PADDING = isMobileTimeline ? 50 : 20;
	const PREV_GAP_PADDING = isMobileTimeline ? 25 : 8;
	const MOBILE_DUAL_STACK_GAP = -20;
	const MOBILE_TOP_DUAL_PREV_GAP = 100;
	const DOT_CONTENT_OFFSET = 16;
	const CONNECTOR_DOT_OFFSET = 30;
	const YEAR_MARKER_GAP = 8;

	const anchors = [...document.querySelectorAll(
		'.timeline-item, .timeline-image, .year-marker, .timeline-break'
	)];

	const timelineShifts = [];

	const getYear = el => Number(el.dataset.year);

	const getTimelineSlot = el => {
		if (el.classList.contains('timeline-break')) {
			return yearToTimelineSlot(Number(el.dataset.from));
		}

		return yearToTimelineSlot(getYear(el));
	};

	const getTop = el => parseFloat(el.style.top) || 0;

	const setTop = (el, top) => {
		el.style.top = `${top}px`;
	};

	const getTranslateY = el => {
		const transform = window.getComputedStyle(el).transform;

		if (!transform || transform === 'none') {
			return 0;
		}

		return new DOMMatrixReadOnly(transform).m42;
	};

	const getContent = item => item?.querySelector('.timelineItemContent');

	const getContentOffset = item => DOT_CONTENT_OFFSET;

	const getContentTop = item => {
		const content = getContent(item);

		if (!content) {
			return -Infinity;
		}

		return getTop(item) + getContentOffset(item) + getTranslateY(content);
	};

	const getContentBottom = item => {
		const content = getContent(item);

		if (!content) {
			return -Infinity;
		}

		return getContentTop(item) + content.scrollHeight;
	};

	const getAnchorCollisionTop = anchor => {
		if (!anchor) {
			return Infinity;
		}

		if (anchor.classList.contains('year-marker')) {
			return getTop(anchor) - YEAR_MARKER_GAP;
		}

		return getTop(anchor);
	};

	const findPreviousCollisionAnchor = (index, item) => {
		const slot = getTimelineSlot(item);

		for (let i = index - 1; i >= 0; i--) {
			if (isMobileTimeline || getTimelineSlot(anchors[i]) !== slot) {
				return anchors[i];
			}
		}

		return null;
	};

	const findNextCollisionAnchor = (index, item) => {
		const slot = getTimelineSlot(item);

		for (let i = index + 1; i < anchors.length; i++) {
			if (isMobileTimeline || getTimelineSlot(anchors[i]) !== slot) {
				return anchors[i];
			}
		}

		return null;
	};

	const sortAnchors = () => {
		anchors.sort((a, b) => getTop(a) - getTop(b));
	};

	const shiftAnchorsAfterSlot = (slot, amount) => {
		timelineShifts.push({ slot, amount });

		anchors.forEach(anchor => {
			if (getTimelineSlot(anchor) > slot) {
				setTop(anchor, getTop(anchor) + amount);
			}
		});
	};

	const shiftCurrentStackAndLaterSlots = (startIndex, slot, amount) => {
		timelineShifts.push({ slot, amount });

		anchors.forEach((anchor, index) => {
			const anchorSlot = getTimelineSlot(anchor);

			if (
				anchorSlot > slot ||
				(isMobileTimeline && anchorSlot === slot && index >= startIndex)
			) {
				setTop(anchor, getTop(anchor) + amount);
			}
		});
	};

	const anchorHasVisibleDot = anchor => {
		if (!anchor.classList.contains('timeline-item')) {
			return false;
		}

		// Matches CSS: .timeline-item:not(.left.dual)::before
		return !(
			anchor.classList.contains('left') &&
			anchor.classList.contains('dual')
		);
	};

	const getCorrectedYearTop = year => {
		const slot = yearToTimelineSlot(year);

		const matchingDotAnchors = anchors.filter(anchor => {
			return (
				anchor.classList.contains('timeline-item') &&
				Number(anchor.dataset.year) === year &&
				anchorHasVisibleDot(anchor)
			);
		});

		if (matchingDotAnchors.length) {
			return Math.max(...matchingDotAnchors.map(getTop));
		}

		return yearToY(year) + timelineShifts.reduce((total, shift) => {
			return slot > shift.slot ? total + shift.amount : total;
		}, 0);
	};

	const positionRangesWithCorrectedTops = () => {
		const rangeEls = document.querySelectorAll('.timeline-range');

		rangeEls.forEach(range => {
			const startYear = Number(range.dataset.from);
			const endYear = Number(range.dataset.to);

			let inclusiveStart = 'i';
			let inclusiveEnd = 'i';

			if (range.dataset.inclusive) {
				inclusiveStart = range.dataset.inclusive[0];
				inclusiveEnd = range.dataset.inclusive[1];
			}

			const top = getCorrectedYearTop(startYear);
			const bottom = getCorrectedYearTop(endYear);

			const rangeStartOffsets = {
				i: -6,
				l: 12,
				e: 30
			};

			const rangeEndOffsets = {
				i: 30,
				l: 12,
				e: 0
			};

			const rangeTop = top + rangeStartOffsets[inclusiveStart];
			const rangeBottom = bottom + rangeEndOffsets[inclusiveEnd];

			range.style.top = `${rangeTop}px`;
			range.style.height = `${rangeBottom - rangeTop}px`;
		});
	};

	// Clear old transforms before measuring.
	anchors.forEach(anchor => {
		const content = getContent(anchor);

		if (content) {
			content.style.transform = '';
		}
	});

	// First resolve timeline spacing itself.
	let changed = true;
	let guard = 0;

	while (changed && guard < 50) {
		changed = false;
		guard++;

		sortAnchors();

		for (let index = 0; index < anchors.length; index++) {
			const anchor = anchors[index];

			if (!anchor.classList.contains('timeline-item')) {
				continue;
			}

			const content = getContent(anchor);

			if (!content) {
				continue;
			}

			const anchorSlot = getTimelineSlot(anchor);
			const next = findNextCollisionAnchor(index, anchor);
			const nextSlot = next ? getTimelineSlot(next) : Infinity;

			const naturalTop = getTop(anchor) + getContentOffset(anchor);
			const naturalBottom = naturalTop + content.scrollHeight;

			const anchorIsTopMobileDual =
				isMobileTimeline &&
				anchor.classList.contains('left') &&
				anchor.classList.contains('dual');

			if (anchorIsTopMobileDual) {
				const prevItem = anchors
					.slice(0, index)
					.reverse()
					.find(candidate => candidate.classList.contains('timeline-item'));

				if (prevItem) {
					const prevBottom = getContentBottom(prevItem) + MOBILE_TOP_DUAL_PREV_GAP;

					if (naturalTop < prevBottom) {
						const needed = prevBottom - naturalTop;

						shiftCurrentStackAndLaterSlots(index, anchorSlot, needed);

						changed = true;
						break;
					}
				}
			}

			// On mobile, same-year dual items stack tightly instead of using year spacing.
			if (isMobileTimeline && next && nextSlot === anchorSlot) {
				const desiredNextTop = naturalBottom + MOBILE_DUAL_STACK_GAP - getContentOffset(next);
				const needed = Math.max(0, desiredNextTop - getTop(next));

				if (needed > 0) {
					setTop(next, getTop(next) + needed);
					shiftAnchorsAfterSlot(anchorSlot, needed);

					changed = true;
					break;
				}

				continue;
			}

			const nextTop = getAnchorCollisionTop(next);

			if (naturalBottom > nextTop - YEAR_GAP_PADDING) {
				const needed = naturalBottom - (nextTop - YEAR_GAP_PADDING);

				shiftAnchorsAfterSlot(anchorSlot, needed);

				changed = true;
				break;
			}
		}
	}

	sortAnchors();

	// Redraw timeline ranges after final anchor shifts.
	positionRangesWithCorrectedTops();

	// Position content within the settled timeline.
	anchors.forEach((anchor, index) => {
		if (!anchor.classList.contains('timeline-item')) {
			return;
		}

		const content = getContent(anchor);

		if (!content) {
			return;
		}

		content.style.transform = '';

		const prev = findPreviousCollisionAnchor(index, anchor);
		const next = findNextCollisionAnchor(index, anchor);

		const naturalTop = getTop(anchor) + getContentOffset(anchor);
		const naturalBottom = naturalTop + content.scrollHeight;

		const prevIsSameMobileStack =
			isMobileTimeline &&
			prev?.classList.contains('timeline-item') &&
			getTimelineSlot(prev) === getTimelineSlot(anchor);

		const nextIsSameMobileStack =
			isMobileTimeline &&
			next?.classList.contains('timeline-item') &&
			getTimelineSlot(next) === getTimelineSlot(anchor);

		const anchorIsTopMobileDual =
			isMobileTimeline &&
			anchor.classList.contains('left') &&
			anchor.classList.contains('dual');

		const prevGap = anchorIsTopMobileDual && !prevIsSameMobileStack
			? MOBILE_TOP_DUAL_PREV_GAP
			: prevIsSameMobileStack
				? MOBILE_DUAL_STACK_GAP
				: PREV_GAP_PADDING;

		const prevBottom = prev?.classList.contains('timeline-item')
			? getContentBottom(prev) + prevGap
			: -Infinity;

		const nextTop = nextIsSameMobileStack
			? getContentTop(next) - MOBILE_DUAL_STACK_GAP
			: getAnchorCollisionTop(next) - YEAR_GAP_PADDING;

		let translateY = 0;

		if (naturalBottom > nextTop) {
			const proposedTranslateY = nextTop - naturalBottom;
			translateY = Math.min(translateY, proposedTranslateY);
		}

		if (isMobileTimeline) {
			translateY = Math.max(translateY, 0);
		}

		if (naturalTop + translateY < prevBottom) {
			translateY = Math.max(translateY, prevBottom - naturalTop);
		}

		if (translateY !== 0) {
			content.style.transform = `translateY(${translateY}px)`;
		}
	});

	// Connector pass after transforms settle.
	anchors.forEach(anchor => {
		if (!anchor.classList.contains('timeline-item')) {
			return;
		}

		const content = getContent(anchor);

		if (!content) {
			return;
		}

		const contentRect = content.getBoundingClientRect();
		const itemRect = anchor.getBoundingClientRect();
		const connectorY = itemRect.top - contentRect.top + CONNECTOR_DOT_OFFSET;

		content.style.setProperty('--connector-y', `${connectorY}px`);
	});

	const updateTimelineHeight = () => {
		const timeline = document.querySelector('.characterTimeline');

		if (!timeline) {
			return;
		}

		let maxBottom = 0;

		anchors.forEach(anchor => {
			const anchorTop = getTop(anchor);
			let anchorBottom = anchorTop;

			if (anchor.classList.contains('timeline-item')) {
				const content = getContent(anchor);

				if (content) {
					const contentBottom = getContentBottom(anchor);
					anchorBottom = Math.max(anchorBottom, contentBottom);
				}
			} else {
				anchorBottom = anchorTop + anchor.offsetHeight;
			}

			maxBottom = Math.max(maxBottom, anchorBottom);
		});

		document.querySelectorAll('.timeline-range').forEach(range => {
			const rangeTop = parseFloat(range.style.top) || 0;
			const rangeBottom = rangeTop + range.offsetHeight;

			maxBottom = Math.max(maxBottom, rangeBottom);
		});

		timeline.style.height = `${maxBottom + 150}px`;
	};

	updateTimelineHeight();
}

/* -------------------------------------------------- SCROLL TO TOP BUTTON -------------------------------------------------- */

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
} 


// **************************************************************************************
//                                         ONLOAD
// **************************************************************************************

document.addEventListener('DOMContentLoaded', function() {
	
	PIXELS_PER_YEAR = window.innerWidth < 1000 ? 240 : 140;
	buildTimeline();

	requestAnimationFrame(() => {	
		requestAnimationFrame(positionRanges);
		requestAnimationFrame(adjustForCollisions);
	});
	
});

let lastTimelineWidth = window.innerWidth;
let resizeTimer;

window.addEventListener('resize', () => {
	const currentWidth = window.innerWidth;

	if (currentWidth === lastTimelineWidth) {
		return;
	}

	lastTimelineWidth = currentWidth;
	
	clearTimeout(resizeTimer);

	resizeTimer = setTimeout(() => {
		PIXELS_PER_YEAR = window.innerWidth < 1000 ? 240 : 140;
		buildTimeline();

		requestAnimationFrame(() => {
			requestAnimationFrame(adjustForCollisions);
		});
	}, 150);
});

window.onscroll = function scrollFunction() {

	// Show or Hide "Scroll to top" button
		let toTopButton = document.getElementById("toTopButton");
		
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			toTopButton.style.display = "block";
		} else {
			toTopButton.style.display = "none";
		}
	 
	// Hide all Tool Tips
		for (const item of document.getElementsByClassName('tooltip')) {
			closeToolTip(item);
		}
}