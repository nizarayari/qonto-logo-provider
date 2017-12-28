import db from '../db/schema.js';

const Icon = module.exports;

Icon.createIcon = ({ category, icon_url }) => db.Icon.create({ category, icon_url });
Icon.findIconId = (id) => db.Icon.findById(id);
