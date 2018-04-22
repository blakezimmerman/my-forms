import * as React from 'react';
import styled from 'client/styling';
import FadeInOut from 'client/components/FadeInOut';
import { H2 } from 'client/components/Headers';

const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2.5rem 1.5rem;
`;

const FeaturesBody = styled.div`
  max-width: 600px;
`;

const FeatureHeader = H2.extend`
  margin: 0;
`;

const FeatureText = styled.div`
  font-size: 1.1rem;
  line-height: 1.5rem;
  margin: 0.8rem 0 1.8rem 0;
`;

const Features = () => (
  <FadeInOut>
    <FeaturesWrapper>
      <FeaturesBody>
        <FeatureHeader>Create Surveys</FeatureHeader>
        <FeatureText>
          Whether you are planning your next big adventure, managing an event, or collecting feeback,
          getting the opinion of others is important. myForms makes it easy to create sharable surveys
          so that you can find out what matters.
        </FeatureText>
        <FeatureHeader>Create Tests</FeatureHeader>
        <FeatureText>
          Making paper-based tests is so outdated. With myForms, you can choose from 6 different
          question types, and effortlessly create robust tests. After sharing your creation, all
          submissions will be automatically graded too!
        </FeatureText>
        <FeatureHeader>Analyze Results</FeatureHeader>
        <FeatureText>
          Collecting data is only half the battle. myForms will analyze the results of your surveys
          and tests, and give you insights on the general consensus of the survey or show you what
          test questions people struggled with.
        </FeatureText>
      </FeaturesBody>
    </FeaturesWrapper>
  </FadeInOut>
);

export default Features;
