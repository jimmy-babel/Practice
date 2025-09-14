// import Heading from './heading.jsx';
import Section from './section.jsx';
import Heading from './heading.jsx';

export default function UseContext() {
  console.log('function UseContext');
  return (
    <>
      <h1>use-context.jsx</h1>
      <Section level={1}>
        <Heading>h1主标题</Heading>
        <Section level={2}>
          <Heading>h2副标题</Heading>
          <Heading>h2副标题</Heading>
          <Heading>h2副标题</Heading>
          <Section level={3}>
            <Heading>h3子标题</Heading>
            <Heading>h3子标题</Heading>
            <Heading>h3子标题</Heading>
            <Section level={4}>
              <Heading>h4子子标题</Heading>
              <Heading>h4子子标题</Heading>
              <Heading>h4子子标题</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </>
  )
}