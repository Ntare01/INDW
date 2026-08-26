/* ==========================================================================
   media-data.js
   -----------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD PHOTOS OR VIDEOS
   TO THE MEDIA PAGE.

   HOW TO ADD A NEW PHOTO:
     1. Drop the image file into the  assets/media/  folder.
     2. Copy one of the blocks below, paste it into the MEDIA_ITEMS array,
        and update:
          type:     "image"
          src:      "assets/media/your-file-name.jpg"
          caption:  a short description
          category: "performance" | "workshop" | "community"  (or your own —
                    just make sure it also appears in the categories list
                    at the top of media.html)
          big:      true to make it a larger, featured tile (use sparingly)

   HOW TO ADD A NEW VIDEO:
     1. Drop the video file (.mp4 works everywhere) into  assets/media/
     2. Copy a "video" block below and update:
          type:      "video"
          src:       "assets/media/your-clip.mp4"
          thumbnail: an image shown before the video is opened
                      (optional — if left out, the video's first frame is used)
          caption / category / big — same as photos

   That's it — no other file needs to change. Just save and refresh the page.
   Newest items should be added to the TOP of the array so they show first.
   ========================================================================== */

const MEDIA_ITEMS = [
  {
    type: "video",
    src: "assets/media/vid1.mp4",
    caption: "Community documentary preview",
    category: "community",
    big: true,
  },
  {
    type: "image",
    src: "assets/media/pic2.jpeg",
    caption: "Youth performers smiling after rehearsal",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic3.jpg",
    caption: "Decorative stage elements",
    category: "behind-the-scenes",
  },
  {
    type: "video",
    src: "assets/media/vid2.mp4",
    caption: "Festival highlights clip",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic1.jpeg",
    caption: "Photo — community moment",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic5.jpg",
    caption: "Photo — workshop activity",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic6.jpg",
    caption: "Photo — behind the scenes",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic7.jpg",
    caption: "Photo — performers",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic8.jpg",
    caption: "Photo — audience",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic9.jpeg",
    caption: "Photo — rehearsal",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic10.jpg",
    caption: "Photo — costume detail",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic11.jpg",
    caption: "Photo — street performance",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic12.jpg",
    caption: "Photo — local market scene",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic13.jpg",
    caption: "Photo — set preparation",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic14.jpg",
    caption: "Photo — youth program",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic15.jpg",
    caption: "Photo — group portrait",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic16.jpg",
    caption: "Photo — preparation",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic17.jpg",
    caption: "Photo — workshop leader",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic18.jpg",
    caption: "Photo — outdoor performance",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic19.jpg",
    caption: "Photo — cultural display",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic20.jpg",
    caption: "Photo — costume close-up",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic21.jpg",
    caption: "Photo — rehearsal snapshot",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic22.JPG",
    caption: "Photo — community gathering",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic23.jpg",
    caption: "Photo — stage lights",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic24.jpg",
    caption: "Photo — performers warming up",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic25.jpg",
    caption: "Photo — costume prep",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic26.jpg",
    caption: "Photo — community workshop",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic27.jpg",
    caption: "Photo — audience interaction",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic28.JPG",
    caption: "Photo — stage setup",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic29.JPG",
    caption: "Photo — evening performance",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic3.jpg",
    caption: "Photo — drum ensemble",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic30.JPG",
    caption: "Photo — backstage",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic31.JPG",
    caption: "Photo — costume details",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic32.JPG",
    caption: "Photo — ensemble portrait",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic33.JPG",
    caption: "Photo — practice session",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic34.JPG",
    caption: "Photo — craftwork",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic35.JPG",
    caption: "Photo — group rehearsal",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic36.JPG",
    caption: "Photo — celebratory moment",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic37.JPG",
    caption: "Photo — traditional dress",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic38.JPG",
    caption: "Photo — rehearsal close-up",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic39.JPG",
    caption: "Photo — crowd scene",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic4.jpg",
    caption: "Photo — featured thumbnail",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic40.JPG",
    caption: "Photo — event setup",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic41.JPG",
    caption: "Photo — community leaders",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic42.JPG",
    caption: "Photo — stage crew",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic43.JPG",
    caption: "Photo — rehearsal note",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic44.JPG",
    caption: "Photo — crowd engagement",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic45.JPG",
    caption: "Photo — costume fitting",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic46.JPG",
    caption: "Photo — group chat",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic47.JPG",
    caption: "Photo — performance detail",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic48.JPG",
    caption: "Photo — soundcheck",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic49.JPG",
    caption: "Photo — celebration",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic5.jpg",
    caption: "Photo — rehearsal group",
    category: "workshop",
  },
  {
    type: "image",
    src: "assets/media/pic50.JPG",
    caption: "Photo — evening gathering",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic51.JPG",
    caption: "Photo — show moment",
    category: "performance",
  },
  {
    type: "image",
    src: "assets/media/pic52.JPG",
    caption: "Photo — costume detail",
    category: "behind-the-scenes",
  },
  {
    type: "image",
    src: "assets/media/pic53.JPG",
    caption: "Photo — group pose",
    category: "community",
  },
  {
    type: "image",
    src: "assets/media/pic54.JPG",
    caption: "Photo — final bow",
    category: "performance",
  },
  {
    type: "video",
    src: "assets/media/vid3.mp4",
    caption: "Video — full performance 1",
    category: "performance",
  },
  {
    type: "video",
    src: "assets/media/vid4.mp4",
    caption: "Video — rehearsal highlights",
    category: "workshop",
  },
  {
    type: "video",
    src: "assets/media/vid5.mp4",
    caption: "Video — behind the scenes",
    category: "behind-the-scenes",
  },
  {
    type: "video",
    src: "assets/media/vid6.mp4",
    caption: "Video — community moments",
    category: "community",
  },
  {
    type: "video",
    src: "assets/media/vid7.mp4",
    caption: "Video — workshop session",
    category: "workshop",
  },
  {
    type: "video",
    src: "assets/media/vid8.mp4",
    caption: "Video — outdoor performance",
    category: "performance",
  },
  {
    type: "video",
    src: "assets/media/vid9.mp4",
    caption: "Video — highlights reel",
    category: "performance",
  },
  {
    type: "video",
    src: "assets/media/vid10.mp4",
    caption: "Video — interviews",
    category: "community",
  },
  {
    type: "video",
    src: "assets/media/vid11.mp4",
    caption: "Video — closing montage",
    category: "community",
  },
];
