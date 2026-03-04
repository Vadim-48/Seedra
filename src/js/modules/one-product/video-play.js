let apiLoaded = false;
let callbacks = [];
let players = [];

const DEFAULT_PLAYER_VARS = {
    playsinline: 1,
    controls: 1,
    rel: 0,
    modestbranding: 1
};

function loadYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) {
        callback();
        return;
    }

    callbacks.push(callback);

    if (!apiLoaded) {
        apiLoaded = true;
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            callbacks.forEach(cb => cb());
            callbacks = [];
        };
    }
}

export function initVideoPlayers({ selector = '[data-video-file]', autoplay = true } = {}) {
    const wrappers = document.querySelectorAll(selector);
    if (!wrappers.length) return;

    wrappers.forEach((wrapper, index) => {
        const overlay = wrapper.querySelector('.video__overlay');
        const playerElement = wrapper.querySelector('.video__file');

        if (!overlay || !playerElement) return;

        if (!playerElement.id) playerElement.id = `yt-player-${index}`;

        const videoId = playerElement.dataset.videoId;
        if (!videoId) return;

        loadYouTubeAPI(() => {
            const player = new YT.Player(playerElement.id, {
                width: '100%',
                height: '100%',
                videoId,
                playerVars: DEFAULT_PLAYER_VARS,
                events: {
                    onReady: event => {
                        // Нічого не робимо, поки не клікнуть
                    }
                }
            });
            players.push(player);
        });

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            const playIcon = wrapper.querySelector('.video__play-icon');
            if (playIcon) playIcon.style.display = 'none';

            const player = players[index];
            if (player) {
                player.playVideo();
            }
        });
    });
}

export const stopAllVideos = () => {
    players.forEach(player => {
        try {
            player.stopVideo();
        } catch (e) {}
    });

    const slides = document.querySelectorAll('.hero-product__video.video');
    slides.forEach(slide => {
        const overlay = slide.querySelector('.video__overlay');
        const playIcon = slide.querySelector('.video__play-icon');
        if (overlay) overlay.style.display = 'flex';
        if (playIcon) playIcon.style.display = 'block';
    });
};