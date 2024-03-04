const resources = {
  background: {
    coworking_space: "/img/wallpapers/office1.jpg",
    side_view_office: "/img/wallpapers/desktop2.jpg",
    front_view_office: "/img/wallpapers/meeting1.jpg",
    desktop: "/img/wallpapers/desktop1.jpg",
    meeting_1: "/img/wallpapers/meeting1.jpg",
    meeting_2: "/img/wallpapers/meeting2.jpg",
    meeting_3: "/img/wallpapers/meeting1.jpg",
    hr_office: "/img/wallpapers/desktop2.jpg",
    cto_office: "/img/wallpapers/admin.jpg",
    recreation: "/img/wallpapers/recreation.jpg",
    training_center: "/img/wallpapers/meeting3.jpg",
  },
};

const sounds = {
  shared: {
    volume: 0.5,
  },
  players: {
    click: {
      sound: { src: ["/sound/click.mp3"] },
      settings: { oneAtATime: true },
    },
    typing: {
      sound: { src: ["/sound/typing.mp3"] },
      settings: { oneAtATime: true },
    },
    deploy: {
      sound: { src: ["/sound/deploy.mp3"] },
      settings: { oneAtATime: true },
    },
    success: {
      sound: {
        src: ["/sound/success.mp3"],
        volume: 1,
      },
      settings: { oneAtATime: true },
    },
    abort: {
      sound: { src: ["/sound/abort.mp3"] },
      settings: { oneAtATime: true },
    },
    warning: {
      sound: { src: ["/sound/warning.mp3"] },
      settings: { oneAtATime: true },
    },
  },
};

const theme = {
  color: {
    content: "#a1ecfb",
  },
  padding: 20,
  responsive: {
    small: 600,
    medium: 800,
    large: 1200,
  },
};

export { resources, sounds, theme };
