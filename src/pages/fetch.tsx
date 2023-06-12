import Image from 'next/image';

export default function Contacts({ contacts }) {
  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.name}>
          <p>{contact.name}</p>
          <p>{contact.email}</p>
          <Image src={contact.imageSrc} width={200} height={200} />
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3008/v1/test/contacts', { headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'ngrok-skip-browser-warning':  'true'}
  });
  const contacts = await res.json();
  return { props: { contacts } };
}
