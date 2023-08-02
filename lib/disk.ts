import { promises as fs } from 'fs';
import path from 'path';
import { cache as reactCache } from 'react';

const seed_path = (prefix: string, tweep: string, extension: string) => path.join(process.cwd(), 'seed',`${prefix}_${tweep}.${extension}`);

export function sortByDate(tweets: any[] | undefined) {
  return tweets?.filter(Boolean)?.sort((a, b) => {
    const aDate = new Date(a.created_at);
    const bDate = new Date(b.created_at);

    if (aDate > bDate) return -1;
    if (aDate < bDate) return 1;
    return 0;
  });
}

async function readFile({ prefix, tweep, extension = 'json', encoding = 'utf-8' } : { prefix: string, tweep: string, extension?: string, encoding?: BufferEncoding }, parse?: boolean): Promise<any[] | undefined> {
  const file = seed_path(prefix, tweep, extension);

  await fs.access(file);

  const data = await fs.readFile(file, encoding);

  return parse ? JSON.parse(data) : data;
}

export async function findTweets(tweep: string): Promise<any[] | undefined> {
  return readFile({ prefix: 'latest_100_tweets', tweep }, true);
}

export async function findSentiment(tweep: string): Promise<any[] | undefined> {
  return readFile({ prefix: 'sentiment_latest_100_tweets', tweep }, true);
}

export async function findTopics(tweep: string): Promise<any[] | undefined> {
  return readFile({ prefix: 'topics_latest_100_tweets', tweep }, true);
}

export async function findTweeps(tweeps?: string[]): Promise<any[] | undefined> {
  const data = [
    {
      id_str: '747681743201796096',
      name: 'عبدالعزيز أحمد بغلف🇸🇦',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1629085154034450433/J90_N6QH_normal.jpg',
      screen_name: 'AzizbagBag',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    }, 
    {
      id_str: '520547057',
      name: 'خديجة بن قنة',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1677080950528696321/dlDYbo5h_normal.jpg',
      screen_name: 'Benguennak',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '242245578',
      name: 'د. عائض القرني',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1656672021835825156/2ixuyeNd_normal.jpg',
      screen_name: 'Dr_alqarnee',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '186101324',
      name: 'د. جاسم المطوع',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1613095983977566209/9sVQ2OpV_normal.jpg',
      screen_name: 'drjasem',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '619293948',
      name: 'فايز المالكي',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1658947844840075265/-utBDjij_normal.jpg',
      screen_name: 'fayez_malki',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '493974917',
      name: 'أ.د. جابر القحطاني',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1477693060721090581/2ah7067s_normal.jpg',
      screen_name: 'JaberAlkahtani',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '153368409',
      name: 'لبيب',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1365397848553062407/p0wNdLVA_normal.jpg',
      screen_name: 'Labeebhubb',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '583012000',
      name: 'سلمان الفرج',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1470872832859123723/AHw4Tjap_normal.jpg',
      screen_name: 'salman_f13',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '275558381',
      name: 'أ. د. طارق الحبيب',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/620506305665499136/WqcbwQP1_normal.jpg',
      screen_name: 'Talhabeeb',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    {
      id_str: '575661707',
      name: 'ياسر الزعاترة',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1660240225170337793/9x2S-n4b_normal.jpg',
      screen_name: 'YZaatreh',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
  ];

  if (tweeps) {
    return data.filter(({ screen_name }) => tweeps.includes(screen_name));
  }

  return data;
}

export const diskCache = {
  findTweeps: reactCache(findTweeps),
  findTweets: reactCache(findTweets),
  findSentiment: reactCache(findSentiment),
  findTopics: reactCache(findTopics),
};