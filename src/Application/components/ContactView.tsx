
interface ContactViewSchema {
    letter: string
}

const ContactView = (props: ContactViewSchema) => {
    const { letter } = props
  return (
    <div
      style={{ borderRadius: "50%" }}
      className="bg-blue-600 text-white font-bold flex
                        justify-center items-center h-16 w-16 text-2xl"
    >
      <p>{letter || null}</p>
    </div>
  );
};

export default ContactView;
