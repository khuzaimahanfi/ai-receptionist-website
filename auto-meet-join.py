from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import schedule, time, sys
from datetime import datetime

MEETING_LINK = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NTU3OTFlNGQtMWIwOC00MzZhLWE0ZTEtYjVmODcyM2E5ZTg0%40thread.v2/0?context=%7b%22Tid%22%3a%22fc69fe2f-1f49-487c-a75a-77f468e17ec0%22%2c%22Oid%22%3a%221de29e80-94db-40b9-a56b-c4bfeaca8838%22%7d"

def join_meeting():
    print(f"Joining meeting at {datetime.now().strftime('%H:%M:%S')}")
    
    chrome_options = Options()
    # Add arguments to prevent Chrome crashes
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--remote-debugging-port=9222")
    
    # Use a separate user data directory to avoid conflicts
    chrome_options.add_argument("--user-data-dir=C:/temp/chrome_automation")
    
    # Alternative: Use your existing profile (comment out the line above and uncomment these)
    # chrome_options.add_argument("--user-data-dir=C:/Users/MuhammadKhuzaima/AppData/Local/Google/Chrome/User Data")
    # chrome_options.add_argument("--profile-directory=Profile 5")

    driver = webdriver.Chrome(service=Service("C:/Users/MuhammadKhuzaima/AppData/Local/Google/Chrome/User Data/chromedriver-win64/chromedriver.exe"), options=chrome_options)
    driver.get(MEETING_LINK)
    
    time.sleep(10)  # Wait for page to load
    
    try:
        # Click "Join now" button
        join_btn = driver.find_element(By.XPATH, "//button[contains(., 'Join now')]")
        join_btn.click()
        print("Successfully joined meeting!")
    except Exception as e:
        print(f"Join button not found: {e}")
        print("You may need to manually click 'Join now' or handle login.")
    
    # Keep the browser open for a bit, then close
    time.sleep(5)
    try:
        driver.quit()
    except:
        pass

# Schedule Mon–Fri at 11:00 AM
schedule.every().monday.at("11:00").do(join_meeting)
schedule.every().tuesday.at("11:00").do(join_meeting)
schedule.every().wednesday.at("11:00").do(join_meeting)
schedule.every().thursday.at("11:00").do(join_meeting)
schedule.every().friday.at("11:00").do(join_meeting)

# Check if user wants to join now
if len(sys.argv) > 1 and sys.argv[1].lower() in ['now', 'join', 'immediate']:
    print("Joining meeting immediately...")
    join_meeting()
    print("Meeting join attempt completed. Script will exit.")
    sys.exit(0)

print("Script is running in scheduled mode. Waiting for scheduled times...")
print("To join immediately, run: python auto-meet-join.py now")

while True:
    schedule.run_pending()
    time.sleep(30)
