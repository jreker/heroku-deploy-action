# heroku-deploy-action
This action deploys your application directly to heroku.
## Usage
### Prerequisites
- Heroku account
    - API-KEY
    - Logon E-Mail 

### Example Workflow
Example `.yaml` workflow file:

```yaml
 deploy:
    name: Deploy to Heroku
    needs: package
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Upload to Heroku
        uses: jreker/heroku-deploy-action@v1.1
        with:
          APP_NAME: myapplication-name
          HEROKU_API_KEY: ${{secrets.HEROKU_API_KEY}}
          MAIL: info@jreker.de
```
### Variables

| Variable | Description |
|---|----|
|HEROKU_API_KEY| Heroku API-Key|
|MAIL| Your Heroku E-Mail Address|
|APP_NAME|Heroku Application Name|


# Sources
> Documentation https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action#commit-tag-and-push-your-action-to-github