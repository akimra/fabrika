const { Sequelize } = 'sequelize';

exports.GetFindOptions = (searchParams) => {
  // Формирование объекта опций выборки из бд для sequelize
  // params: 
  // searchParams: Object - объект тела запроса
  const {
    limit,
    offset,
    filter,
    filter_value,
    sort_by,
    sort_dir
  } = searchParams;
  const filter_from = searchParams.filter_from || Number.MIN_SAFE_INTEGER;
  const filter_to = searchParams.filter_to || Number.MAX_SAFE_INTEGER;
  let options;

  if (filter) {
    const { gte, lte } = Sequelize.Op;

    if (filter_value) {
      options = {
        where: {
          [filter]: filter_value
        },
        limit,
        offset,
        order: [[`${sort_by}`, `${sort_dir}`]]
      };
    } else {
      options = {
        where: {
          [filter]: {
            [gte]: filter_from,
            [lte]: filter_to
          }
        },
        limit,
        offset,
        order: [[`${sort_by}`, `${sort_dir}`]]
      };
    }
  } else {
    options = {
      limit,
      offset,
      order: [[`${sort_by}`, `${sort_dir}`]]
    };
  }
  options.attributes = {
    exclude: "updatedAt"
  };

  return options;
};

exports.GetFindOptionsForTotal = (searchParams) => {
  // Формирование объекта опций выборки из бд для sequelize
  // без учета лимита пагинации
  // params: 
  // searchParams: Object - объект тела запроса
  const {
    filter,
    filter_value
  } = searchParams;
  const filter_from = searchParams.filter_from || Number.MIN_SAFE_INTEGER;
  const filter_to = searchParams.filter_to || Number.MAX_SAFE_INTEGER;
  let options = {};

  if (filter) {
    const { gte, lte } = Sequelize.Op;

    if (filter_value) {
      options = {
        where: {
          [filter]: filter_value
        },
      };
    } else {
      options = {
        where: {
          [filter]: {
            [gte]: filter_from,
            [lte]: filter_to
          }
        }
      };
    }
  }

  return options;
};