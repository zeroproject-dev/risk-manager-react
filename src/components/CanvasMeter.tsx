import { useEffect, useRef, useState } from 'react';

interface CanvasMeterProps {
	meter: number;
	width?: number;
	height?: number;
}

interface Category {
	[key: string]: string;
}

const categoryColors: Category = {
	'Muy Alto': '#fe0000',
	Alto: '#ed7f30',
	Medio: '#ffff00',
	Bajo: '#00af52',
	'Muy Bajo': '#92d14f',
};

const getLevelColor = (l: number) => {
	let level = '';
	if (l > 19) level = 'Muy Alto';
	else if (l > 9) level = 'Alto';
	else if (l > 4) level = 'Medio';
	else if (l > 2) level = 'Bajo';
	else if (l > 0) level = 'Muy Bajo';

	return categoryColors[level];
};

export function CanvasMeter({
	meter,
	width = 100,
	height = 50,
}: CanvasMeterProps) {
	const [textColor, setTextColor] = useState(() => {
		const darkModePreference = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		if (darkModePreference.matches) return '#fff';
		return '#000';
	});
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const darkModePreference = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		const onPrefChange = (e: MediaQueryListEvent) => {
			console.log(e.matches);
			if (e.matches) setTextColor('#fff');
		};
		darkModePreference.addEventListener('change', onPrefChange);
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const padding = 20;
		const width = canvas.width - padding;
		const height = canvas.height;
		const offsetX = padding / 2;
		const max = 25;

		ctx.clearRect(0, 0, canvas.width, height);

		const gradient = ctx.createLinearGradient(
			offsetX,
			(height - 20) / 2,
			width,
			(height - 20) / 2
		);
		gradient.addColorStop(0, categoryColors['Muy Bajo']);
		gradient.addColorStop(4 / max, categoryColors['Bajo']);
		gradient.addColorStop(9 / max, categoryColors['Medio']);
		gradient.addColorStop(19 / max, categoryColors['Alto']);
		gradient.addColorStop(1, categoryColors['Muy Alto']);

		ctx.beginPath();
		ctx.fillStyle = gradient;
		ctx.fillRect(offsetX, height - 20, width, height);
		ctx.closePath();

		const posX = offsetX + width * (meter / max);

		ctx.beginPath();
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 2;
		ctx.moveTo(posX, height - 20);
		ctx.lineTo(posX, height);
		ctx.stroke();
		ctx.closePath();

		ctx.font = '25px Arial';
		ctx.fillStyle = textColor;
		ctx.textAlign = 'center';
		ctx.fillText(`${meter}`, posX, height - 25);

		return () => {
			darkModePreference.removeEventListener('change', onPrefChange);
		};
	}, [meter, textColor]);

	return <canvas ref={canvasRef} width={width} height={height} />;
}
