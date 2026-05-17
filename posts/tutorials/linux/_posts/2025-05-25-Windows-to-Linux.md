---
layout: post
title: First steps in Linux as a lifelong Windows user
description: Notes about how I replicated my old Windows 10 work setup in Linux Kubuntu 25.
tags:
---
Being a computer scientist, I spend a lot of my time working with the command line. Unfortunately, as a lifelong Windows user, this experience has always felt like an afterthought, having to install extra shells like MinGW just to have access to basic tools developed for people like me. So, for my new work laptop, it was time for change.

1. dummy
{:toc}

# Why I didn't switch earlier
There were always a few reasons I was scared to make the jump from Windows to Linux, but they mostly stemmed from ignorance:

1. **Fear of missing the programs I am used to.** I had the impression that software vendors supported Linux much less than Windows and macOS, but in my case, this is only really true for my image and video editors, Paint.NET and VEGAS Pro. All the rest of my daily drivers (PyCharm, Spotify, TeXstudio, Discord, ...) exist for Linux without compromise.
2. **Fear of choosing the wrong Linux distro.** There are many distros (see below) to choose from, and someone who has never used Linux could never even begin to make an educated choice. So, I just asked one of my colleagues who has been a long-time Linux user for his top-3 recommendations and their trade-offs. And since there are plenty of tutorials online for how to switch distros, the stakes for making the wrong choice were low anyway.
3. **Fear of missing a mouse/arrow-based file manager.** I passionately hate having to manage files through the command line. Luckily, basically every Linux distro comes with a visual file explorer.
4. **Fear of having to know command-line wizardry for basic actions.** Again, this came from the misconceived notion that Linux is a purely command-line-based operating system for people without a mouse. Yet, for most basic actions (e.g. creating or deleting folders, launching programs, ...) no command line is needed.

With those fears out of the way, it is now time to commit to Linux.

# Installing Linux
Using a computer that already has an operating system, download [Ventoy](https://www.ventoy.net/en/doc_start.html) and use it to format an empty USB drive to become _bootable_. Then download an `.iso` file for the particular style of Linux (the distro) you want and put it on this USB drive.

The distro (or "flavour of Linux") you go with will mostly change how you install new software, both because they each have their own package managers and because third-party companies don't support all distros. The reason I went with Kubuntu is because it is basically a less ugly Ubuntu, which in turn is the modern descendant of Debian, which is a very stable distro well-supported by third parties.
{:.note title="Does the distro matter?" .filled}

Now, turn off the machine you want to install Linux to, plug this USB drive into it, turn on the machine while holding the relevant key (e.g. F12) and select that USB drive as the boot drive in the machine's BIOS. Ventoy will guide you through the rest of the setup.

# Replicating my Windows setup
Now I will go over how I installed all the programs I normally use on Windows in Linux. Somehow, there exist like five different ways in which software is installed on Linux, and it is hence way less user-friendly than I would like it to be. Luckily, installing software only has to happen once, so the pain won't last.

## Notepad: gedit
Let's start off easy and get an app for scratch notes without any bells and whistles. For this, I have chosen `gedit`. To install it, we can either run
```bash
sudo apt install gedit
```
on the command line, or use the mouse to navigate through the Kubuntu store to install it from there.

## Browser: Firefox
For what follows, we'll need a browser, so we can access the internet and download other software with a GUI. My browser of choice is Firefox because it is less memory-leaky than Chrome in my experience.

Ordinarily, if you wanted to install some approximation of Firefox, you could run `apt install firefox` to get it from Ubuntu's package catalogue. The problem is that this will install Firefox Snap, a restricted version of the usual browser. Instead, we will get it from Mozilla's own package catalogue. To check which version *would* be installed if you ran `apt install firefox`, run
```bash
apt policy firefox
```
You will notice the Snap version. Declare Mozilla's package repository with
```bash
add-apt-repository ppa:mozillateam/ppa
gedit /etc/apt/preferences.d/mozillateamppa 
```
and copy-paste
```
Policy: firefox*
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001

Package: //  
Pin: version /snap/  
Pin-Priority: -1
```
into this file. This now means that all calls to `apt install` with something that starts with `firefox` will be looked up at Mozilla first. `apt policy firefox` should show this higher-priority repository, and now we can run
```bash
sudo apt install firefox
```

## Chat: Discord
Debian-based distros, like Ubuntu and Kubuntu, accept files with the `.deb` extension as program installers, much like `.msi` or `.exe` is used for installers on Windows. In this example, Discord's Linux download provides a `.deb` file that can be double-clicked in the file explorer.

## Python IDE: PyCharm
Other programs, like JetBrains PyCharm, do not come with a nice `.deb` installer. Instead, you drop their executable code in the right folder and create some way of accessing that location.

The file hierarchy in Linux has quite some redundancy to it at first sight, which is why people wonder which folder should hold program files. I opt for the `/opt/` folder.

So, download PyCharm via Firefox and extract the files to a folder (e.g. `pycharm-2025.1.1.1`) in your downloads folder. Then, in the command line:
```bash
sudo mkdir /opt/PyCharm
sudo mv ~/Downloads/pycharm-2025.1.1.1 /opt/PyCharm
```
Now the software exists in the right place, but is not yet discovered by Kubuntu. To have it be an application that shows up in the app menu, open the *Menu Editor* app and create an entry for PyCharm with path `/opt/PyCharm/bin/pycharm`. To get the icon, look through the same files for an SVG or PNG.

The alternative to using the *Menu Editor* is to manually create a `.desktop` file (which is like a Windows shortcut) with
```bash
sudo mkdir -p ~/.local/share/applications
gedit ~/.local/share/applications/PyCharm.desktop
```
which you fill with
```
[Desktop Entry]
Type=Application
Name=PyCharm
GenericName=Python IDE
Comment=
Icon=/opt/PyCharm/bin/pycharm.svg

Exec=/opt/PyCharm/bin/pycharm
Path=
Terminal=false
TerminalOptions=
NoDisplay=false
StartupNotify=true

X-KDE-SubstituteUID=false
X-KDE-Username=
```
and now when you refresh your app menu, you should see PyCharm too.

### pip
You install the Python package manager using `apt`:
```bash
sudo apt install python3-pip
```

### Miniconda
Installing `conda` commands is notoriously finicky, because the whole point of Conda is being able to switch between different sets of extra commands being available in the shell and/or have the same commands be pointed to different Python instances on-the-fly. As you might imagine, it's not obvious you could just change the behaviour of the shell while it is running.

To install it, run
```bash
sudo mkdir /opt/miniconda3
cd /opt/miniconda3
sudo wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O installer.sh
sudo bash installer.sh -u -p .
sudo rm installer.sh
```
The `-u` means "upgrade existing version" if you already have Conda, and `-p .` means "install here" (which is not the default). When prompted about initialisation, answer `no`.

You want to configure initialisation [as follows](https://stackoverflow.com/questions/54429210/how-do-i-prevent-conda-from-activating-the-base-environment-by-default):
```bash
source /opt/miniconda3/bin/activate
conda init bash
conda config --set auto_activate_base false
```
The first line will give your shell temporary access to `conda` commands. The second line will configure your `bash` terminal specifically to always have access to `conda` commands (if you replace `bash`  by `--all`, you will alter all other terminals you have on your system), and the third line will prevent `bash` from running `conda activate base` when it starts (because this is annoying).

## Mobile app IDE: Android Studio
Installing Android Studio starts much like PyCharm: extract, move to `/opt/`, run installer. Now, some additionalities are required:

### Android SDK
The Android software development kit is distinct from the IDE you use to develop apps that use it, so it needs to be installed separately. 

It is somewhat contested where you should put this SDK, but this is really only a question because Linux's permissions in `/opt/` are read-only by default. This should not be an issue for most software, since configuration settings should be the only part of software that is user-specific and thus the only part that should not live under `/opt/`.

The problem is that SDKs can be extended with downloadable modules. Here is my view: `/opt/` is for all third-party software, not managed by a package manager and not compiled by the user. The permissions issues are not relevant to the placement. The Android SDK definitely should go under a folder `/opt/androidsdk/` or `/opt/sdks/android/`. To allow the SDK to be extended even without running your IDE as superuser, execute
```bash
sudo chmod -R 757 /opt/androidsdk/
```
and now when you run the installer, you point it to this folder for installing the SDK.

### Android emulator
The installer will mention whether it detects support for hardware virtualisation, which will be useful for the emulator. You can check whether your machine supports this acceleration by running the following commands:
```bash
sudo apt install cpu-checker
egrep -c '(vmx|svm)' /proc/cpuinfo
sudo kvm-ok
```
   If the number shown is larger than 0, you're good to go. Run
```bash
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
```
At this point, you should have finished installation and can create the app shortcut like you did for PyCharm.

### Command-line tools
In my case, the Android command-line tools were not installed automatically. You do this by going into the *Languages & Frameworks* settings of Android Studio, then *Android SDK*, then the tab *SDK Tools*. Check the box and click *Apply*. The first time I tried this, the installation failed, and I fixed it using the `chmod` command above.

### Flutter
For cross-platform development, you will want Flutter. Unlike the Android SDK, this SDK is installed by downloading it, extracting it, and moving it into `/opt/`. Unlike PyCharm, you do not want this software because it is an app you open through the menu, but rather for the command-line tools it provides. Thus, all you need is to make its binaries discoverable to the command line by appending their path to the `$PATH` variable, by opening
```bash
sudo gedit ~/.bashrc
```
and adding the line
```bash
export PATH="/opt/fluttersdk/bin:$PATH"
```
(or whatever path you installed at) somewhere at the bottom.

To check how far you are from having a working Flutter installation, run
```bash
flutter doctor
```
and see.

You likely want to execute
```bash
dart pub global activate dart_format
```
and install the *DartFormat* plugin for Android Studio.

## Markdown editor: Obsidian
AppImage hell... You can get it to work using AppArmor, but then you don't even get an icon in the task bar. Just get the .deb I guess...

## LaTeX editor: TeXstudio
Finally, an application we can just install as
```bash
sudo apt install texstudio
```
Life could be a dream.

Sike, it gets more difficult. TeXstudio installs TeX Live, which has three path variables that are important. You can find them with
```bash
kpsewhich -var-value TEXMFROOT
kpsewhich -var-value TEXMFHOME
kpsewhich -var-value TEXMFVAR
```
If the `TEXMFHOME` is in an undesirable location as it was for me, run
```bash
sudo nano /etc/texmf/texmf.d/texmf.cnf
```
add `TEXMFHOME=$HOME/.texlive2025/texmf-home` and then run 
```bash
sudo update-texmf
tlmgr init-usertree
```
And now, to install any missing LaTeX packages, run
```
tlmgr install ...
```

We also mustn't forget to install `biber`:
```bash
sudo apt install biber
```

Furthermore, to equip TeXstudio with support for Dutch spellchecking, run:
```bash
sudo apt install hunspell-nl
```

## Citation manager: Zotero
Zotero by default comes in the same form as PyCharm, but lucky for us, somebody built an automatic service that constructs a `.deb` shortly after Zotero releases new updates.

Rather than downloading the `.deb`, the maintainer has provided us with a script that automates the declaration of the repository as we did for Firefox. [Run](https://github.com/retorquere/zotero-deb?tab=readme-ov-file#installing-zotero):
```bash
wget -q -O - https://raw.githubusercontent.com/retorquere/zotero-deb/master/install.sh | sudo bash
```
where `-q -O -` means "quietly output to stdout" and `|` means "take stdout and send it to the stdin of what follows". Then,
```bash
sudo apt update
```
and now `apt policy zotero` shows the available install for
```bash
sudo apt install zotero
```

## Music player: Spotify
Spotify has a similar installation process to Zotero, except with a slightly different way of registering the repository. It adds new data in two places: `/etc/apt/trusted.gpg.d/` for Spotify's cryptographic key, and `/etc/apt/sources.list.d/` for the URL to the repository.

First run
```bash
sudo apt install curl
curl -sS https://download.spotify.com/debian/pubkey_C85668DF69375001.gpg | sudo gpg --dearmor --yes -o /etc/apt/trusted.gpg.d/spotify.gpg
```
which basically downloads Spotify's public GPG key and outputs (with `|`) only the downloaded data (hence all other `curl` prints are silenced with `-s`) into a file `spotify.gpg`.

Then, run
```bash
echo "deb https://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
```
which, similarly, takes the result from `echo` (which is indeed the string that follows) and pipes it (`|`) into a file `spotify.list` rather than printing it out loud.

Now we are done. Update `apt` as we did above
```bash
sudo apt update
```
and now `apt policy spotify-client` shows that we are ready to run
```bash
sudo apt install spotify-client
```

## Image editor: Krita
Because there is no .NET on Linux, there is no Paint.NET. Because I do not like how GIMP looks and feels, I've decided to install Krita instead. It is available from the *Software Centre* in Snap form.

If, after installing Krita, you [can't see the app icon](https://www.reddit.com/r/krita/comments/1847vyr/i_am_using_krita_snap_on_ubuntu_after_the_latest/), run
```bash
sudo gedit /var/lib/snapd/desktop/applications/krita_krita.desktop
```
and replace `Icon=krita` with
```
Icon=/snap/krita/current/usr/share/icons/hicolor/256x256/apps/krita.png
```

## Login: Re-enabling the fingerprint reader

```
sudo apt install -y fprintd libpam-fprintd 
sudo pam-auth-update --enable fprintd
fprintd-enroll $USER
```
You will first be prompted for your password, and then be prompted for a finger (probably the right index finger). Tap it on the fingerprint reader several times at different angles. When it stops asking, you have re-enabled fingerprint login next time. The amount of tries you get before needing a password can be configured by running
```
sudo gedit /etc/pam.d/common-auth
```
and looking for the line that mentions "fprintd".

## Wi-Fi: Configuring `eduroam`
As a university researcher, I should be able to connect to any `eduroam` network. Getting this to work is tricky, but doable on Kubuntu.

1. Look for the one application that has *Networking* in the name.
2. Click *Add new connection - Wi-Fi - Create.
3. *Wi-Fi* tab: select `eduroam` as SSID (you should be in an `eduroam` area for this).
4. *Wi-Fi Security* tab: WPA/WPA2 Enterprise. At the bottom, fill in the username and password you would ordinarily use to connect to `eduroam` as per your university's instructions. Lastly, click the file selection button for the CA certificate and browse to `/usr/share/ca-certificates/mozilla/HARICA_TLS_RSA_Root_CA_2021.crt`

# Cool tricks in Kubuntu
## Shortcuts
In the `Menu Editor`, find an app of interest and go to the *Advanced* tab. There, you can configure a shortcut key combination for launching the application. For example, I have Firefox configured to launch when I press `Windows + F` so that I don't have to move my cursor to start a Google search.

## Window manager
Press `Windows + T` to get the abstract layout of your windows. When click-and-dragging a window, hold shift for it to snap to this layout.

Also, to quickly align and resize the currently active window, you can half-screen and quarter-screen is with `Windows + up/down/left/right` (functionality which has apparently also been part of the Windows versions I have been using, without me knowing!) and maximise/minimise with `Windows + PgUp/PgDown`. For some magical reason, these six keys are already grouped in a perfect rectangle on the keyboard of my new Windows laptop.

# Conclusion
I was scared to make the jump from Window to Linux, but actually, I don't feel like I'm missing anything on Linux (except for maybe Paint.NET and VEGAS Pro, but okay, I have a separate computer with GPU for those). I can install software tools for the command line with more ease than ever before, which is exactly what I wanted. And also, my laptop's battery life is great and it stays nice and quiet, because there are no resource-sucking monsters that appear from out of nowhere. 

I'm not going back.