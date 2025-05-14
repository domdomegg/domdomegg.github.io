import clsx from 'clsx';
import type React from 'react';

type VideoProps = {
	url: string;
	className?: string;
	autoLoopMuted?: boolean;
};

const Video: React.FC<VideoProps> = ({
	url,
	className,
	autoLoopMuted: gifStyle,
}) => {
	return (
		<video
			src={url}
			controls={!gifStyle}
			autoPlay={gifStyle}
			muted={gifStyle}
			loop={gifStyle}
			className={clsx('rounded-lg', className)}
		/>
	);
};

export default Video;
