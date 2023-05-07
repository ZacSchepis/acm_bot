import argparse
import re
def main():
    """Kick things off: parse the arguments, build a simulation, run it"""
    # parser = argparse.ArgumentParser(description="network simulator")
    parser = argparse.ArgumentParser(description="Basic Setup")
    parser.add_argument(
        '--serverID','-s',help='Server ID'
    )
    parser.add_argument(
        '--inviteCode','-i',help='Invite link code to check against'
    )
    # parser.
    invite_regex = re.compile(r'^[a-zA-Z0-9_-]{8,}$')   
    args = parser.parse_args()
    assert re.match(r'^\d{18}$',args.serverID), f"Invalid Server ID Format"
    if not invite_regex.match(args.inviteCode):
        print(F"Error: '{args.inviteCode}' is not a valid Discord invite code")
        exit(1)
    # assert not invite_regex.fullmatch(args.inviteCode), f"Invalid invite link code format"
if __name__ == "__main__":
    main()
