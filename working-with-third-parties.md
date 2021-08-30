## Working with third party moderation providers

1. Tisane.ai - automated text moderation

   - Following are the required that are needed for Tisane.ai:

     - Ocp-Apim-Subscription-Key

     - Language (English, Spanish, Portugese, French)

   - Sign up with Tisane.ai https://tisane.ai locate your key under your Developer Profile
     https://tisane.ai/developer/

   - Use primary or secondary key.

   - Admin can set the threshold using the sliders for five types of severity that are:

     - Bigotry (Hate Speech)
     - Personal Attacks (Cyberbullying)
     - Criminal Activity
     - Sexual Advances
     - Profanity

   - For each category of moderation, the Admin can set the filter level as None, Extreme, High,
     Medium and Low. Moving the slider to the right makes the moderation more aggressive. For
     example, the message "arse" would be blocked if the filter level for Profanity is set to Low,
     but not if it is set to High.

   - The Admin can set the level for a severity as None, If they wish to ignore any of the
     categories.

   ![alt text](public/readme/tisane.png)

2. Sift Ninja - automated text moderation

   Following are the required that are needed for Sift Ninja API:

   - SiftNinja Account Name

   - SiftNinja Channel Name

   - SiftNinja API Key

   Note: SiftNinja is only available for existing clients and will be deprecated in the future.

3. Sight Engine - automated image moderation

   Following are the required that are needed for Sight Engine API:

   - Sightengine API User

   - Sightengine API Key

   - Sightengine Workflow ID

   And where to find the values are documented on
   https://sightengine.com/docs/image-moderation-workflows

   You will need to follow the instructions in the "Get API access credentials" and the "Create a
   Workflow" sections.

   An Admin will set their moderation rules in their SightEngine dashboard.

   Note: SightEngine image moderation is only supported with the application at this time
