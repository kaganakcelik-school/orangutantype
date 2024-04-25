import { useEffect, useState } from 'react'

export default function useCountup(time) {
	const [timer, setSecondsLeft] = useState(null)

	useEffect(() => {
		if (timer === null) {
			return;
		};

		const timeout = setTimeout(() => {
			setSecondsLeft(timer + 0.1)
		}, 100)

		return () => clearTimeout(timeout);
	}, [timer])

	function start(seconds) {
		setSecondsLeft(seconds);
	}

	return { timer, start };
}