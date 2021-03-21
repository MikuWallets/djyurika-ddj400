export enum PlayHistorySortParam {
  CHECKED_FIRST = 'reviewed,desc',
  UNCHECKED_FIRST = 'reviewed,asc',

  TITLE_ASC = 'title,asc',
  TITLE_DESC = 'title,desc',

  CREATED_ASC = 'createdAt,asc',
  CREATED_DESC = 'createdAt,desc',

  PICK_ASC = 'pickCount,asc',
  PICK_DESC = 'pickCount,desc',

  RECENTPLAYED_ASC = 'lastPlayedAt,asc',
  RECENTPLAYED_DESC = 'lastPlayedAt,desc',
}
