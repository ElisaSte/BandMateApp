import { Ad } from "./ad";
import { musicians } from "./musicians";

export const ads: Ad[] = [
  {
    id: 1,
    musician: musicians[0],
    title: "Looking for a guitarist",
    lookingFor: "Guitar",
    description:
      "We are a metal band looking for a guitarist to complete the lineup. We rehearse regularly and want to start playing live again.",
    date: "2026-10-04T12:30:00",
    isActive: true,
  },

  {
    id: 2,
    musician: musicians[1],
    title: "Drummer wanted for rock project",
    lookingFor: "Drums",
    description:
      "Rock project looking for a drummer with some experience. We already have guitar, bass and vocals and are working on original songs.",
    date: "2026-10-03T18:45:00",
    isActive: true,
  },

  {
    id: 3,
    musician: musicians[2],
    title: "Looking for a vocalist",
    lookingFor: "Vocals",
    description:
      "We are putting together a modern metal band and need a vocalist who enjoys both clean and heavier styles.",
    date: "2026-10-02T15:20:00",
    isActive: true,
  },

  {
    id: 4,
    musician: musicians[3],
    title: "Bassist needed",
    lookingFor: "Bass",
    description:
      "Looking for a bassist to join a melodic metal project. We have several songs ready and would like to start rehearsing soon.",
    date: "2026-10-01T19:10:00",
    isActive: true,
  },

  {
    id: 5,
    musician: musicians[4],
    title: "Keyboard player wanted",
    lookingFor: "Keyboard",
    description:
      "Symphonic metal project looking for a keyboard player. Looking for someone interested in both atmospheric parts and songwriting.",
    date: "2026-09-29T11:40:00",
    isActive: true,
  },

  {
    id: 6,
    musician: musicians[5],
    title: "Guitarist for live shows",
    lookingFor: "Guitar",
    description:
      "We had a guitarist leave the band and are now looking for someone who wants to play live and rehearse once a week.",
    date: "2026-09-25T17:00:00",
    isActive: false,
  },

  {
    id: 7,
    musician: musicians[6],
    title: "Drummer wanted",
    lookingFor: "Drums",
    description:
      "Looking for a drummer for an alternative rock project. We have already found someone and this ad is now closed.",
    date: "2026-09-20T13:15:00",
    isActive: false,
  },

  {
    id: 8,
    musician: musicians[7],
    title: "Looking for a bassist",
    lookingFor: "Bass",
    description:
      "Small local metal project looking for a bassist. We are currently writing new material and hoping to start rehearsing soon.",
    date: "2026-09-18T16:30:00",
    isActive: true,
  },
];
