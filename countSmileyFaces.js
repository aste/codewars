const countSmileys = (arr) => arr.filter((el) => el.match(/(:|;)(-|~)?(\)|D)/g)).length;
