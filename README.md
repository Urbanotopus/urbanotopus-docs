# Urbanotopus Docs
Documentation and specs for Urbanotopus.

## How does it work
1. Pull requests are created to write changes to master;
2. They get accepted and merged;
3. Travis builds the documentation and deploys it to the `gh-pages` branch;
4. GitHub builds the pages and the changes get published to [urbanotopus.vanille.bid](https://urbanotopus.vanille.bid).

## How does the specs are written
The specs are written into [specs.yml](specs.yml) and then the file is used the
generate a HTML documentation page.

## How to test the YAML specs file
1. Install [Python 3.7 (or upper)](https://www.python.org/downloads/release/python-337/);
2. Create and activate a python virtual environment;
3. Install the requirements through `pip install -r requirements.txt`;
4. Watch the YAML specs file through `python watch_docs.py`;
5. Open your web-browser to [http://127.0.0.1:5000/](http://127.0.0.1:5000/).

