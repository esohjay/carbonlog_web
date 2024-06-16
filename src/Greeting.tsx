type GreetingProps = {
  name?: string;
};

export default function Greeting({ name }: GreetingProps) {
  if (name) return <h1 className="text-red-500">Hello, {name}</h1>;

  return <button>Login</button>;
}
