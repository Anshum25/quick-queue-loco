
type BusinessAboutProps = {
  name: string;
  category: string;
  city: string;
};

export const BusinessAbout = ({ name, category, city }: BusinessAboutProps) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">About {name}</h2>
    <p className="text-muted-foreground">
      {category === "hospital" 
        ? `${name} is a leading healthcare facility offering comprehensive medical services with a focus on patient care and comfort.` 
        : `${name} is a top-rated ${category} providing exceptional service to customers in ${city}.`
      }
    </p>
  </div>
);
