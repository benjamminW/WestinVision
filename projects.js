/*
 * WESTIN VISION PROJECT CATALOG
 *
 * Add future portfolio projects by copying one complete project object below.
 * Each project creates one card on the website. Its `videos` array becomes the
 * selectable film list inside the player.
 */
window.WESTIN_PROJECTS = [
  {
    id: "guilford-pathways",
    title: "Guilford Pathways",
    category: "Education · Campaign Series",
    description:
      "A three-film series highlighting hands-on career pathways at Guilford High School.",
    thumbnail:
      "https://i.ytimg.com/vi/USOK2pm6m_4/maxresdefault.jpg",
    videos: [
      {
        title: "Production Pathway",
        youtubeId: "USOK2pm6m_4",
      },
      {
        title: "Credit Union Pathway",
        youtubeId: "ZQ8DFilrdjc",
      },
      {
        title: "Graphic Lab Pathway",
        youtubeId: "VxkXWnfxgx0",
      },
    ],
  },

  
   
   {
      id: "Community-Politics",
      title: "Community and Politics",
      category: "Short Form",
      description: "Different videos for campaigns and politicians in the Rockford area.",
      thumbnail: "https://i.ytimg.com/vi/9dDQyViynmQ/maxresdefault.jpg",
      videos: [
        { title: "Stroll on State", youtubeId: "9dDQyViynmQ" },
      /  { title: "Film two", youtubeId: "YOUTUBE_ID" },/
      ],
    },
   

  /*
   * COPY THIS TEMPLATE TO ADD ANOTHER PROJECT:
   *
   * {
   *   id: "short-unique-name",
   *   title: "Project title",
   *   category: "Brand Film · Documentary",
   *   description: "One short sentence about the project.",
   *   thumbnail: "https://i.ytimg.com/vi/YOUTUBE_ID/maxresdefault.jpg",
   *   videos: [
   *     { title: "Film one", youtubeId: "YOUTUBE_ID" },
   *     { title: "Film two", youtubeId: "YOUTUBE_ID" },
   *   ],
   * },
   */
];
