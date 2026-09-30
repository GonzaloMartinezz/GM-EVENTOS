import { EventCategory, CATEGORY_LABELS } from '../types/event';

interface Props {
  q: string;
  category: EventCategory | '';
  city: string;
  onChangeQ: (v: string) => void;
  onChangeCategory: (v: EventCategory | '') => void;
  onChangeCity: (v: string) => void;
  onSubmit: () => void;
}

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [EventCategory, string][];

export default function SearchBar({
  q,
  category,
  city,
  onChangeQ,
  onChangeCategory,
  onChangeCity,
  onSubmit,
}: Props) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Buscá tu banda, obra o evento favorito..."
        value={q}
        onChange={(e) => onChangeQ(e.target.value)}
      />
      <select value={category} onChange={(e) => onChangeCategory(e.target.value as EventCategory | '')}>
        <option value="">Todas las categorías</option>
        {CATEGORIES.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select value={city} onChange={(e) => onChangeCity(e.target.value)}>
        <option value="">Todas las ciudades</option>
        <option value="San Miguel de Tucumán">Tucumán</option>
        <option value="Buenos Aires">Buenos Aires</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
}
