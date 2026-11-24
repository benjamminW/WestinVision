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
        { title: "I VOTED TODAY - Short Doc", youtubeId: "373NiGmOjOI" },
      ],
    },

  {
    id: "family-counseling-services",
    title: "Family Counseling Services",
    category: "Nonprofit · Event Films",
    description:
      "A CEO message and Butterfly Award film for Family Counseling Services' 2026 celebration.",
    thumbnail:
      "https://i.ytimg.com/vi/NzqcILu39ok/maxresdefault.jpg",
    videos: [
      {
        title: "CEO Message 2026",
        youtubeId: "NzqcILu39ok",
      },
      {
        title: "Butterfly Award 2026",
        youtubeId: "pAJqfcmgg-8",
      },
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

/*
 * INSTAGRAM REELS
 *
 * Optional `views` and `likes` on each reel are added together for the
 * "views and counting" tally under the Reels heading. Update them whenever the
 * numbers grow; leave either one out if it is not known.
 *
 * Each collection becomes one group in the Reels section. Add additional
 * collections by copying the object below. A thumbnail may be reused across
 * reels or overridden on an individual reel with its own `thumbnail` value.
 */
window.WESTIN_REELS = [
  {
    id: "community-and-politics",
    title: "Community & Politics",
    category: "Politics",
    thumbnail: "assets/reel.JPEG",
    reels: [
      {
        title: "Alderperson Bell Reel",
        instagramUrl: "https://www.instagram.com/reel/DcSIz8eMH0s/",
      },
      {
        title: "Alderperson Bell Reel",
        instagramUrl: "https://www.instagram.com/reel/DcMP86zpLEE/",
        likes: 82,
      },
      {
        title: "Alderperson Bell Reel",
        instagramUrl: "https://www.instagram.com/reel/DZuoPUiv2h6/",
        likes: 66,
      },
      {
        title: "Alderperson Bell - Thanksgiving Dinner",
        facebookUrl: "https://www.facebook.com/reel/1484048110535934",
        views: 3100,
        likes: 115,
      },
      {
        title: "Alderperson Bell - Feeling Grateful",
        facebookUrl: "https://www.facebook.com/reel/901511039626855",
        views: 3800,
        likes: 106,
      },
      {
        title: "Alderperson Bell - Be A Buddy, Not A Bully March",
        facebookUrl: "https://www.facebook.com/reel/982484807898471",
        views: 9700,
        likes: 332,
      },
      {
        title: "Corey Dixon Reel",
        youtubeId: "HyHtmspZ6hA",
        views: 4,
        likes: 0,
      },
      {
        title: "FatherHood United - Back to School Recap",
        youtubeId: "iN1_97NIevM",
        views: 2,
        likes: 0,
      },
      {
        title: "FatherHood United - Father's Day Event Recap",
        youtubeId: "KX5sRoaeWPo",
        views: 1,
        likes: 0,
      },
      {
        title: "Home for Good - Maurice West",
        youtubeId: "J-ykt4cN5y4",
        views: 3,
        likes: 0,
      },
    
    ],
  },

  /*
   * COPY THIS TEMPLATE TO ADD ANOTHER REEL COLLECTION:
   *
   * {
   *   id: "short-unique-name",
   *   title: "Collection title",
   *   category: "Campaign · Social",
   *   thumbnail: "assets/collection-cover.jpg",
   *   reels: [
   *     { title: "Reel one", instagramUrl: "https://www.instagram.com/reel/REEL_CODE/", views: 1200, likes: 85 },
   *     { title: "Reel two", instagramUrl: "https://www.instagram.com/reel/REEL_CODE/" },
   *     { title: "Facebook reel", facebookUrl: "https://www.facebook.com/reel/REEL_ID" },
   *   ],
   * },
   */
];
